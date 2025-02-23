// src/services/getAdopterBioService.js
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";

/**
 * Fetch a single adopter's profile from /users/{userId}.
 * No composite index is required.
 */
export const fetchAdopterProfile = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const snapshot = await getDoc(userDocRef);
    if (!snapshot.exists()) {
      console.warn("No such user document!");
      return null;
    }
    return snapshot.data();
  } catch (error) {
    console.error("Error fetching adopter profile:", error);
    return null;
  }
};

/**
 * Update the adopter's hobbies in adoptionData.personal.hobbies.
 * No composite index is required.
 */
export const updateAdopterHobbies = async (userId, hobbies) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      "adoptionData.personal.hobbies": hobbies,
    });
    console.log("✅ Hobbies updated in Firestore:", hobbies);
  } catch (error) {
    console.error("Error updating hobbies:", error);
  }
};

/**
 * Subscribes to real-time updates for the adopter's metrics.
 *
 * Query 1: Adopted posts (posts where 'adoptedBy' equals currentUserId).
 *  - No composite index required.
 *
 * Query 2: Pending adoption requests.
 *  - Requires a composite index on the "adoptionRequests" collection group:
 *      Fields: adopterId (ASCENDING) and status (ASCENDING)
 *
 * Query 3: User comments.
 *  - Requires a single-field index on 'userId' (automatically created).
 *
 * @param {string} currentUserId - The user's Firestore UID.
 * @param {function} callback - A function that receives an updater function:
 *                              (prevMetrics) => ({ ...prevMetrics, [key]: newValue })
 * @returns {function} - Unsubscribe function to clean up listeners.
 */
export const subscribeAdoptionMetrics = (currentUserId, callback) => {
  console.log(`🔍 Subscribing to real-time metrics for user: ${currentUserId}`);

  // 1. Try executing the query ONCE to force Firestore to log the missing index
  (async () => {
    try {
      const pendingQuery = query(
        collectionGroup(db, "adoptionRequests"),
        where("adopterId", "==", currentUserId),
        where("status", "==", "pending")
      );
      await getDocs(pendingQuery); // Force Firestore to log missing index!
    } catch (error) {
      console.error("🔥 Firestore Index Error (Pending Requests):", error);
    }

    try {
      const commentsQuery = query(
        collectionGroup(db, "comments"),
        where("userId", "==", currentUserId)
      );
      await getDocs(commentsQuery); // Force Firestore to log missing index!
    } catch (error) {
      console.error("🔥 Firestore Index Error (Comments):", error);
    }
  })();

  // 2. Real-time subscriptions
  const adoptedQuery = query(
    collection(db, "posts"),
    where("adoptedBy", "==", currentUserId)
  );
  const unsubscribeAdopted = onSnapshot(adoptedQuery, (snapshot) => {
    const adoptedCount = snapshot.size;
    console.log(`✅ Adopted Pets Updated: ${adoptedCount}`);
    callback((prev) => ({ ...prev, adoptedCount }));
  });

  const pendingQuery = query(
    collectionGroup(db, "adoptionRequests"),
    where("adopterId", "==", currentUserId),
    where("status", "==", "pending")
  );
  const unsubscribePending = onSnapshot(pendingQuery, (snapshot) => {
    const pendingCount = snapshot.size;
    console.log(`⏳ Pending Requests Updated: ${pendingCount}`);
    callback((prev) => ({ ...prev, pendingCount }));
  });

  const commentsQuery = query(
    collectionGroup(db, "comments"),
    where("userId", "==", currentUserId)
  );
  const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
    const commentCount = snapshot.size;
    console.log(`💬 User Comments Updated: ${commentCount}`);
    callback((prev) => ({ ...prev, commentCount }));
  });

  console.log("👀 Listening for updates...");

  return () => {
    console.log(
      `🚪 Unsubscribing from real-time metrics for user: ${currentUserId}`
    );
    unsubscribeAdopted();
    unsubscribePending();
    unsubscribeComments();
  };
};

/**
 * Update the adopter's cover image at the root level in Firestore.
 */
export const updateAdopterCoverImage = async (userId, coverImageUrl) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      coverImage: coverImageUrl, // ✅ Now stored at the top-level
    });
    console.log("✅ Cover image updated at root:", coverImageUrl);
  } catch (error) {
    console.error("❌ Error updating cover image:", error);
    throw error;
  }
};
