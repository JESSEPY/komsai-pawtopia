import axios from "axios"; // ✅ Import Axios
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

// ✅ Set up Axios instance for FCM requests
const axiosFCM = axios.create({
  baseURL: "https://pawtopia.scarlet2.io", // Base URL for your FCM endpoint
  headers: { "Content-Type": "application/json" },
});

/**
 * Helper: Retrieve a user's FCM token from Firestore.
 * @param {string} userId - The ID of the user.
 * @returns {string|null} The user's FCM token, or null if not found.
 */
const getUserFcmToken = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data().fcmToken;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user FCM token:", error);
    return null;
  }
};

/**
 * Helper: Retrieve pet details from Firestore.
 * @param {string} postId - The ID of the pet post.
 * @returns {string|null} The pet's name, or null if not found.
 */
const getPetDetails = async (postId) => {
  try {
    const petDocRef = doc(db, "posts", postId);
    const petDocSnap = await getDoc(petDocRef);
    if (petDocSnap.exists()) {
      return petDocSnap.data().petName; // Assuming 'title' contains the pet's name
    }
    return "a pet";
  } catch (error) {
    console.error("Error fetching pet details:", error);
    return "a pet";
  }
};

/**
 * Helper: Store a notification in Firestore for a given user.
 * @param {string} userId - The ID of the user to notify.
 * @param {string} title - Notification title.
 * @param {string} message - Notification message.
 * @param {string} type - Notification type (e.g., "approved", "declined", "reviewing", "request").
 */
const storeNotification = async (userId, title, message, type) => {
  try {
    const notifRef = collection(db, "users", userId, "notifications");
    await addDoc(notifRef, {
      title,
      message,
      type, // ✅ Store notification type
      timestamp: serverTimestamp(),
      read: false,
    });
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};

/**
 * Sends an adoption request and notifies the shelter.
 */
export const sendAdoptionRequest = async (
  postId,
  adopterId,
  adopterEmail,
  adopterName,
  shelterId
) => {
  try {
    const petName = await getPetDetails(postId);
    const requestRef = collection(db, `posts/${postId}/adoptionRequests`);

    // Check for an existing request by this adopter for this pet.
    const existingQuery = query(
      requestRef,
      where("adopterId", "==", adopterId)
    );
    const querySnapshot = await getDocs(existingQuery);
    if (!querySnapshot.empty) {
      return {
        success: false,
        message: `You have already submitted an adoption request for ${petName}.`,
      };
    }

    const newRequest = {
      adopterId,
      adopterEmail,
      adopterName,
      status: "pending",
      submittedAt: serverTimestamp(),
      reviewedAt: null,
      notes: "",
      shelterId,
    };

    await addDoc(requestRef, newRequest);

    // Retrieve the shelter's FCM token.
    const shelterFcmToken = await getUserFcmToken(shelterId);
    if (shelterFcmToken) {
      // ✅ Send FCM push notification via Axios
      axiosFCM
        .post("/send_notification.php", {
          fcmToken: shelterFcmToken,
          title: "New Adoption Request",
          body: `${adopterName} has submitted an adoption request for ${petName}.`,
        })
        .catch((error) => console.error("FCM Notification Error:", error));

      // ✅ Store the notification in Firestore with `type: "request"`
      await storeNotification(
        shelterId,
        "New Adoption Request",
        `${adopterName} has submitted an adoption request for ${petName}.`,
        "request" // ✅ Type for correct icon in the dropdown
      );
    }

    return { success: true, message: "Adoption request sent successfully!" };
  } catch (error) {
    console.error("Error sending adoption request:", error);
    return { success: false, message: "Failed to send adoption request." };
  }
};

export const updateAdoptionStatus = async (
  postId,
  requestId,
  status,
  adopterId
) => {
  try {
    let finalRequestId = requestId;
    const petName = await getPetDetails(postId);

    if (!finalRequestId) {
      const requestRef = collection(db, `posts/${postId}/adoptionRequests`);
      const q = query(requestRef, where("adopterId", "==", adopterId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        finalRequestId = snapshot.docs[0].id;
      } else {
        return { success: false, message: "Adoption request not found." };
      }
    }

    const requestDocRef = doc(
      db,
      `posts/${postId}/adoptionRequests/${finalRequestId}`
    );

    // **🔹 Check if another request is already approved**
    const approvedQuery = query(
      collection(db, `posts/${postId}/adoptionRequests`),
      where("status", "==", "approved")
    );
    const approvedSnapshot = await getDocs(approvedQuery);

    if (!approvedSnapshot.empty && status === "approved") {
      return {
        success: false,
        message: "Another adoption request has already been approved.",
      };
    }

    // **✅ Proceed with updating the status**
    await updateDoc(requestDocRef, {
      status,
      reviewedAt: new Date(),
    });

    const postDocRef = doc(db, `posts/${postId}`);
    if (status === "approved") {
      await updateDoc(postDocRef, {
        adoptionStatus: "approved",
        adoptedBy: adopterId,
        adoptedAt: serverTimestamp(),
      });

      // **❌ Decline all other pending requests**
      const allRequests = await getDocs(
        collection(db, `posts/${postId}/adoptionRequests`)
      );
      const batch = writeBatch(db);
      allRequests.forEach((docSnap) => {
        if (docSnap.id !== finalRequestId) {
          batch.update(docSnap.ref, { status: "declined" });
        }
      });
      await batch.commit();
    } else if (status === "reviewing") {
      await updateDoc(postDocRef, {
        adoptionStatus: "reviewing",
        adoptedBy: "",
        adoptedAt: null,
      });
    } else {
      await updateDoc(postDocRef, {
        adoptionStatus: "Looking for a Forever Home",
        adoptedBy: "",
        adoptedAt: null,
      });
    }

    // **✅ Dynamic Notification Based on Status**
    let notificationTitle = "";
    let notificationType = "";

    if (status === "approved") {
      notificationTitle = "Adoption Approved";
      notificationType = "approved";
    } else if (status === "declined") {
      notificationTitle = "Adoption Declined";
      notificationType = "declined";
    } else if (status === "reviewing") {
      notificationTitle = "Adoption Under Review";
      notificationType = "reviewing";
    } else {
      notificationTitle = "Adoption Request Update";
      notificationType = "update";
    }

    // **✅ Send Notification to Adopter**
    const adopterFcmToken = await getUserFcmToken(adopterId);
    if (adopterFcmToken) {
      axiosFCM
        .post("/send_notification.php", {
          fcmToken: adopterFcmToken,
          title: notificationTitle,
          body: `Your adoption request for ${petName} has been ${status}.`,
        })
        .catch((error) => console.error("FCM Notification Error:", error));

      await storeNotification(
        adopterId,
        notificationTitle,
        `Your adoption request for ${petName} has been ${status}.`,
        notificationType
      );
    }

    return { success: true, message: `Adoption status updated to "${status}"` };
  } catch (error) {
    console.error("Error updating adoption status:", error);
    return { success: false, message: "Failed to update adoption status." };
  }
};
