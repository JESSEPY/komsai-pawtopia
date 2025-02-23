import { db } from "../../firebase"; // Firestore instance
import { auth } from "../../firebase"; // Firebase Auth instance
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot,
} from "firebase/firestore";

/**
 * Fetch only posts with postType "Lost Pet" from the "posts" collection, ordered by createdAt descending.
 * Also fetches the user details for each post.
 * @returns {Promise<Array>} Array of lost pet post objects with user details.
 */
export const fetchLostPetPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const lostPetsQuery = query(
      postsRef,
      where("postType", "==", "Lost Pet"), // Filters only Lost Pet posts
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(lostPetsQuery);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch user data for each post
    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        if (!post.userId) {
          return { ...post, user: null }; // Return post without user if userId is missing
        }

        const userRef = doc(db, "users", post.userId);
        const userSnap = await getDoc(userRef);

        return {
          ...post,
          user: userSnap.exists()
            ? {
                userId: post.userId,
                userName: userSnap.data().userName,
                email: userSnap.data().email,
                role: userSnap.data().role,
                isVerified: userSnap.data().isVerified,
                createdAt: userSnap.data().createdAt,
                adoptionData: userSnap.data().adoptionData || {}, // Include adoption info if exists
                mediaUrls: userSnap.data().mediaUrls || {}, // Images/Videos
              }
            : null, // If user does not exist
        };
      })
    );

    return postsWithUserDetails;
  } catch (error) {
    console.error("Error fetching lost pet posts:", error);
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
/**
 * Fetch lost pet posts that belong to the currently logged-in user (real-time updates).
 * Includes user details for each post.
 * @param {Function} onUpdate - Callback function that receives updated posts data.
 * @returns {Function} Unsubscribe function to stop listening for real-time updates.
 */
export const fetchUserLostPetPosts = (onUpdate) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No authenticated user found.");
      return () => {}; // Return empty function if no user
    }

    const postsRef = collection(db, "posts");
    const userLostPetsQuery = query(
      postsRef,
      where("postType", "==", "Lost Pet"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // Listen for real-time updates
    const unsubscribe = onSnapshot(userLostPetsQuery, async (snapshot) => {
      try {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch user data for each post
        const postsWithUserDetails = await Promise.all(
          posts.map(async (post) => {
            if (!post.userId) {
              return { ...post, user: null }; // Return post without user if userId is missing
            }

            const userRef = doc(db, "users", post.userId);
            const userSnap = await getDoc(userRef);

            return {
              ...post,
              user: userSnap.exists()
                ? {
                    userId: post.userId,
                    userName: userSnap.data().userName,
                    email: userSnap.data().email,
                    role: userSnap.data().role,
                    isVerified: userSnap.data().isVerified,
                    createdAt: userSnap.data().createdAt,
                    adoptionData: userSnap.data().adoptionData || {}, // Include adoption info if exists
                    mediaUrls: userSnap.data().mediaUrls || {}, // Images/Videos
                  }
                : null, // If user does not exist
            };
          })
        );

        // Call the provided callback with updated data
        onUpdate(postsWithUserDetails);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    });

    return unsubscribe; // Return the unsubscribe function
  } catch (error) {
    console.error(
      "Error setting up real-time listener for lost pet posts:",
      error
    );
    return () => {}; // Return empty function on error
  }
};
/**
 * ✅ Fetch lost pet posts for a specific user by userId in real-time.
 * @param {string} userId - The Firestore user ID.
 * @param {Function} onUpdate - Callback function to receive real-time updates.
 * @returns {Function} Unsubscribe function to stop listening for updates.
 */
export const fetchUserLostPetPostsById = (userId, onUpdate) => {
  if (!userId) {
    console.error("No user ID provided.");
    return () => {}; // Return empty function if no userId
  }

  const postsRef = collection(db, "posts");
  const userLostPetsQuery = query(
    postsRef,
    where("postType", "==", "Lost Pet"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  // Listen for real-time updates
  const unsubscribe = onSnapshot(userLostPetsQuery, (snapshot) => {
    try {
      const lostPets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onUpdate(lostPets); // Pass updated data to callback
    } catch (error) {
      console.error("Error fetching real-time lost pet posts:", error);
    }
  });

  return unsubscribe; // Return unsubscribe function
};
