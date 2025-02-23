import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot,
} from "firebase/firestore";

/**
 * Fetch all posts, including shelterData from users.
 * @returns {Promise<Array>} Array of post objects with shelter details.
 */
export const fetchPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);

    const posts = await Promise.all(
      snapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();

        // ✅ Fetch Shelter Data from 'users' collection
        let shelterData = null;
        if (postData.userId) {
          const userRef = doc(db, "users", postData.userId);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            shelterData = userSnapshot.data()?.shelterData || null;
          }
        }

        return {
          id: postDoc.id,
          ...postData,
          mediaUrls: postData.mediaUrls || [],
          shelterData, // 🔹 Attach shelter data to the post
        };
      })
    );

    console.log("✅ Fetched Posts with Shelter Data:", posts);
    return posts;
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates for posts.
 * Calls `onUpdate` whenever data changes.
 */
export const subscribeToPosts = (onUpdate) => {
  try {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    console.log("📡 Subscribing to Firestore real-time post updates...");

    const unsubscribe = onSnapshot(postsQuery, async (snapshot) => {
      const posts = await Promise.all(
        snapshot.docs.map(async (postDoc) => {
          const postData = postDoc.data();

          // ✅ Fetch Shelter Data
          let shelterData = null;
          if (postData.userId) {
            const userRef = doc(db, "users", postData.userId);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
              shelterData = userSnapshot.data()?.shelterData || null;
            }
          }

          return {
            id: postDoc.id,
            ...postData,
            mediaUrls: postData.mediaUrls || [],
            shelterData,
          };
        })
      );

      console.log("🔄 Real-time post update received:", posts.length);
      onUpdate(posts);
    });

    return unsubscribe;
  } catch (error) {
    console.error("❌ Firestore subscription error:", error);
    return () => {};
  }
};

/**
 * Toggle like/unlike on a post.
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
    console.error("❌ Error toggling like:", error);
    throw error;
  }
};
