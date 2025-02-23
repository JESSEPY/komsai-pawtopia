import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Fetch all "List a Pet" posts once (for SWR initial fetch).
 * Includes user details, shelterData (if available), and comment count from subcollection.
 */
export const fetchListAPetPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const listAPetQuery = query(
      postsRef,
      where("postType", "==", "List a Pet"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(listAPetQuery);
    const posts = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();

        // Fetch comment count from subcollection
        const commentsRef = collection(db, "posts", docSnap.id, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        const commentCount = commentsSnapshot.size;

        // Retrieve shelterData from user document if userId exists on the post
        let shelterData = null;
        if (data.userId) {
          const userDocRef = doc(db, "users", data.userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            shelterData = userDoc.data().shelterData || null;
          }
        }

        return {
          id: docSnap.id,
          ...data,
          mediaUrls: data.mediaUrls || [],
          commentCount,
          shelterData,
        };
      })
    );

    console.log("Fetched Posts:", posts);
    return posts;
  } catch (error) {
    console.error("❌ Error fetching 'List a Pet' posts:", error);
    throw error;
  }
};

/**
 * Real-time Firestore listener for "List a Pet" posts.
 * Updates SWR cache dynamically, including shelterData retrieval.
 */
export const subscribeToListAPetPosts = (onUpdate) => {
  try {
    const postsRef = collection(db, "posts");
    const listAPetQuery = query(
      postsRef,
      where("postType", "==", "List a Pet"),
      orderBy("createdAt", "desc")
    );

    console.log("🔍 Subscribing to Firestore for real-time updates...");

    const unsubscribe = onSnapshot(listAPetQuery, async (snapshot) => {
      const posts = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();

          // Fetch comment count from subcollection
          const commentsRef = collection(db, "posts", docSnap.id, "comments");
          const commentsSnapshot = await getDocs(commentsRef);
          const commentCount = commentsSnapshot.size;

          // Retrieve shelterData from user document if userId exists on the post
          let shelterData = null;
          if (data.userId) {
            const userDocRef = doc(db, "users", data.userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              shelterData = userDoc.data().shelterData || null;
            }
          }

          return {
            id: docSnap.id,
            ...data,
            mediaUrls: data.mediaUrls || [],
            commentCount,
            shelterData,
          };
        })
      );

      console.log(`✅ Real-time update: ${posts.length} posts fetched.`);
      onUpdate(posts);
    });

    return unsubscribe;
  } catch (error) {
    console.error("❌ Firestore subscription error:", error);
    return () => {}; // Return an empty function on error
  }
};
