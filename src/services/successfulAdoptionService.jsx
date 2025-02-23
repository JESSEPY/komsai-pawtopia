import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

/**
 * Fetch adopted posts in real-time using Firestore's onSnapshot.
 * @param {Function} callback - Function to update state in real-time.
 * @returns {Function} Unsubscribe function to stop listening when component unmounts.
 */
export const fetchAdoptedPostsRealtime = (callback) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("adoptionStatus", "==", "approved"));

    return onSnapshot(q, async (snapshot) => {
      let adoptedPosts = [];

      for (const postDoc of snapshot.docs) {
        const postData = postDoc.data();
        const adoptedById = postData.adoptedBy;

        if (adoptedById) {
          // Fetch adopter details using adoptedBy ID
          const userRef = doc(db, "users", adoptedById);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            postData.adopterDetails = userSnapshot.data();
          } else {
            postData.adopterDetails = null; // If user not found
          }
        }

        adoptedPosts.push({ id: postDoc.id, ...postData });
      }

      callback(adoptedPosts); // Send data to SWR
    });
  } catch (error) {
    console.error("Error fetching adopted posts in real-time:", error);
  }
};

/**
 * Fetch all posts by a specific user while filtering for adopted posts.
 * @param {string} userId - The userId of the adopter.
 * @param {Function} callback - Function to update state in real-time.
 * @returns {Function} Unsubscribe function to stop listening when component unmounts.
 */
export const fetchUserAdoptedPostsRealtime = (userId, callback) => {
  try {
    if (!userId) {
      console.warn("fetchUserAdoptedPostsRealtime called without a userId");
      return;
    }

    console.log("Fetching adopted posts for userId:", userId);
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", userId), // Fetch all posts by this user
      where("adoptionStatus", "==", "approved") // Ensure they are adopted
    );

    return onSnapshot(q, async (snapshot) => {
      console.log(
        "Snapshot received for user-adopted posts:",
        snapshot.docs.length
      );
      let userAdoptedPosts = [];

      for (const postDoc of snapshot.docs) {
        const postData = postDoc.data();
        console.log("Processing post:", postData);

        // Fetch adopter details
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          postData.adopterDetails = userSnapshot.data();
          console.log("Adopter details fetched:", postData.adopterDetails);
        } else {
          postData.adopterDetails = null;
          console.warn("Adopter details not found for userId:", userId);
        }

        userAdoptedPosts.push({ id: postDoc.id, ...postData });
      }

      console.log("Final adopted posts list:", userAdoptedPosts);
      callback(userAdoptedPosts);
    });
  } catch (error) {
    console.error("Error fetching user-adopted posts in real-time:", error);
  }
};
