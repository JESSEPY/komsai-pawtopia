import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const db = getFirestore();

/**
 * One-time fetcher for adoptable posts by a user, ordered by the latest first.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} An array of adoptable posts.
 */
export const getAdoptablePostsForUser = async (userId) => {
  try {
    const adoptablePostsRef = collection(db, "posts");
    const q = query(
      adoptablePostsRef,
      where("userId", "==", userId),
      where("postType", "==", "List a Pet"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching adoptable posts for user: ", error);
    throw error;
  }
};

/**
 * Subscribes to realtime updates for adoptable posts by a user, ordered by the latest first.
 * @param {string} userId - The ID of the user.
 * @param {Function} callback - Called with an array of posts when data changes.
 * @param {Function} errorCallback - Called if an error occurs.
 * @returns {Function} Unsubscribe function.
 */
export const subscribeAdoptablePostsForUser = (
  userId,
  callback,
  errorCallback
) => {
  if (!userId) {
    console.error("No userId provided.");
    return () => {};
  }

  const adoptablePostsRef = collection(db, "posts");
  const q = query(
    adoptablePostsRef,
    where("userId", "==", userId),
    where("postType", "==", "List a Pet"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(posts);
    },
    errorCallback
  );

  return unsubscribe;
};
