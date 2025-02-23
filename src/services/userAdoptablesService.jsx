import { db, auth } from "../../firebase"; // Ensure Firebase is properly imported
import { collection, query, where, onSnapshot } from "firebase/firestore";

/**
 * ✅ Listens for real-time updates on "List a Pet" posts created by the logged-in user.
 * ✅ Counts total posts and posts with `adoptionStatus: "approved"`.
 * @param {Function} callback - Function to handle updates `{ totalListAPet, approvedCount }`
 * @returns {Function} Unsubscribe function to stop listening.
 */
export const subscribeToUserPetPostCounts = (callback) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    const postsRef = collection(db, "posts");

    const petPostsQuery = query(
      postsRef,
      where("userId", "==", currentUser.uid),
      where("postType", "==", "List a Pet")
    );

    const unsubscribe = onSnapshot(petPostsQuery, (snapshot) => {
      const totalListAPet = snapshot.size;
      const approvedCount = snapshot.docs.filter(
        (doc) => doc.data().adoptionStatus === "approved"
      ).length;

      callback({ totalListAPet, approvedCount });
    });

    return unsubscribe; // Call this to stop listening when component unmounts
  } catch (error) {
    console.error("Error subscribing to pet post counts:", error);
    return () => {}; // Return a no-op function in case of failure
  }
};

/**
 * ✅ NEW: Listens for real-time updates on "List a Pet" posts created by a specific user ID.
 * ✅ Fetches data for any user (not just the authenticated user).
 * @param {string} userId - The user ID to track.
 * @param {Function} callback - Function to handle updates `{ totalListAPet, approvedCount }`
 * @returns {Function} Unsubscribe function to stop listening.
 */
export const subscribeToUserPetPostCountsById = (userId, callback) => {
  try {
    if (!userId) {
      console.error("No user ID provided.");
      return () => {}; // Return empty function if no userId
    }

    const postsRef = collection(db, "posts");

    const petPostsQuery = query(
      postsRef,
      where("userId", "==", userId),
      where("postType", "==", "List a Pet")
    );

    const unsubscribe = onSnapshot(petPostsQuery, (snapshot) => {
      const totalListAPet = snapshot.size;
      const approvedCount = snapshot.docs.filter(
        (doc) => doc.data().adoptionStatus === "approved"
      ).length;

      callback({ totalListAPet, approvedCount });
    });

    return unsubscribe; // Call this to stop listening when component unmounts
  } catch (error) {
    console.error("Error subscribing to pet post counts by ID:", error);
    return () => {}; // Return empty function in case of failure
  }
};
