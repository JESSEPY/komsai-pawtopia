// services/storyService.js
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * Fetches stories for the given user from Firestore.
 * @param {string} userId - The authenticated user's ID.
 * @returns {Promise<Array>} - An array of story objects.
 */
export const getStoriesByUser = async (userId) => {
  if (!userId) return [];

  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", userId),
      where("postType", "==", "Story")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
