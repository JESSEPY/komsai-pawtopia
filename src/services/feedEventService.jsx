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

export const fetchEventPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);

    const eventPosts = await Promise.all(
      snapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();

        if (postData.postType !== "Event") return null; // ✅ Only include events

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

    const filteredEvents = eventPosts.filter(Boolean); // Remove null values
    console.log("Fetched Event Posts:", filteredEvents);
    return filteredEvents;
  } catch (error) {
    console.error("Error fetching event posts:", error);
    throw error;
  }
};

export const subscribeToEventPosts = (onUpdate) => {
  try {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    console.log("📡 Subscribing to real-time event post updates...");

    const unsubscribe = onSnapshot(postsQuery, async (snapshot) => {
      const eventPosts = await Promise.all(
        snapshot.docs.map(async (postDoc) => {
          const postData = postDoc.data();

          if (postData.postType !== "Event") return null; // ✅ Only include events

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

      const filteredEvents = eventPosts.filter(Boolean);
      console.log(
        "🔄 Real-time event post update received:",
        filteredEvents.length
      );
      onUpdate(filteredEvents);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Firestore event subscription error:", error);
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
    console.error(" Error toggling like:", error);
    throw error;
  }
};
