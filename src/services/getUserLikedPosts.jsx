import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  where,
} from "firebase/firestore";

/**
 * Fetch posts liked by the currently authenticated user.
 * @returns {Promise<Array>} Array of liked post objects.
 */
export const getUserLikedPosts = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");
  return await getUserLikedPostsById(currentUser.uid);
};

/**
 * ✅ NEW: Fetch posts liked by a specific user by userId.
 * @param {string} userId - The Firestore user ID.
 * @returns {Promise<Array>} Array of liked post objects.
 */
export const getUserLikedPostsById = async (userId) => {
  if (!userId) throw new Error("No userId provided");

  try {
    const postsRef = collection(db, "posts");
    const likedPostsQuery = query(
      postsRef,
      where("likedBy", "array-contains", userId), // Fetch posts liked by userId
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(likedPostsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching liked posts:", error);
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
      await updateDoc(postRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(userId),
      });
    } else {
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
