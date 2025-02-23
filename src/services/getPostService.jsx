import { db } from "../../firebase"; // Import Firestore instance from firebase.js
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

/**
 * Fetch posts from the "posts" collection, ordered by createdAt descending.
 * @returns {Promise<Array>} Array of post objects.
 */
export const fetchPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/**
 * Fetch user data from the "users" collection based on a given userId.
 * @param {string} userId - The Firestore document ID for the user.
 * @returns {Promise<Object|null>} The user data or null if not found.
 */
export const fetchUser = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

/**
 * Toggle the like status of a post for a given user.
 * @param {string} postId - The Firestore document ID for the post.
 * @param {string} userId - The user's ID.
 * @param {boolean} isLiking - true if the user is liking, false if unliking.
 */
export const toggleLikePost = async (postId, userId, isLiking) => {
  try {
    const postRef = doc(db, "posts", postId);
    if (isLiking) {
      // User is liking: add the user ID to likedBy and increment likeCount
      await updateDoc(postRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(userId),
      });
    } else {
      // User is unliking: remove the user ID and decrement likeCount
      await updateDoc(postRef, {
        likeCount: increment(-1),
        likedBy: arrayRemove(userId),
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
