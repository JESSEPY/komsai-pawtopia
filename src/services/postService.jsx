import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

/**
 * Save a new pet listing to Firestore, including Cloudinary image URLs.
 * @param {Object} postData - The post details (title, description, tags, media, userId, userEmail).
 */
export const savePost = async (postData) => {
  try {
    const postRef = await addDoc(collection(db, "posts"), {
      adoptionStatus: "Looking for a Forever Home",
      title: postData.title,
      description: postData.description,
      tags: postData.tags,
      mediaUrls: postData.media, // ✅ Save Cloudinary image URLs
      userId: postData.userId,
      userEmail: postData.userEmail,
      postType: postData.postType || "Unknown", // ✅ Ensure postType is not undefined
      likeCount: 0, // initially 0 likes
      likedBy: [], // initially no users have liked this post
      createdAt: serverTimestamp(), // Automatically set timestamp
      ...(postData.postType === "List a Pet" || postData.postType === "Lost Pet"
        ? {
            petName: postData.petName || "Unknown",
            breed: postData.breed || "Unknown",
          }
        : {}),

      // ✅ Only include reward if it's a "Lost Pet" post and the reward is provided
      ...(postData.postType === "Lost Pet" &&
        postData.reward && { reward: postData.reward }),
      ...(postData.postType === "Lost Pet" &&
        postData.age && { age: postData.age }),
      // ✅ Include lostStatus: "lost" for "Lost Pet" posts
      ...(postData.postType === "Lost Pet" && { lostStatus: "lost" }),
    });

    console.log("Post successfully saved with ID:", postRef.id);
    return postRef.id; // Return the Firestore document ID
  } catch (error) {
    console.error("Error saving post to Firestore:", error);
    throw error;
  }
};
