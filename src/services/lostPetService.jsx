import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // import your Firestore configuration

/**
 * Update the lostStatus of a post in Firestore.
 * @param {string} postId - The ID of the post (doc ID in the "posts" collection).
 * @param {string} newStatus - The new status ("lost", "found", or "resolved").
 */
export const updateLostPetStatus = async (postId, newStatus) => {
  if (!postId || !newStatus) {
    throw new Error("postId and newStatus are required.");
  }

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { lostStatus: newStatus });
};
