import { db } from "../../firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// Retrieves the FCM token of a user from Firestore.
export const getUserFcmToken = async (userId) => {
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

// Stores a notification in Firestore for a given user.
// ✅ Now accepts an optional `postId` for like notifications.
export const storeNotification = async (
  userId,
  title,
  message,
  type,
  postId = null
) => {
  try {
    const notifRef = collection(db, "users", userId, "notifications");
    const notificationData = {
      title,
      message,
      type,
      timestamp: serverTimestamp(),
      read: false,
    };

    // ✅ Include postId only if it's provided (for like notifications)
    if (postId) {
      notificationData.postId = postId;
    }

    await addDoc(notifRef, notificationData);
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};
