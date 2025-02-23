import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

/**
 * Fetches event posts for the currently authenticated user in real-time.
 * @param {string} userId - The ID of the authenticated user.
 * @param {function} callback - Function to update state when data changes.
 * @returns {function} - Unsubscribe function to stop listening.
 */
export const fetchEventsByUserRealtime = (userId, callback) => {
  if (!userId) return () => {};

  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", userId),
      where("postType", "==", "Event")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(events);
    });

    return unsubscribe;
  } catch (error) {
    console.error("🔥 Error fetching event posts in real-time:", error);
    return () => {};
  }
};
