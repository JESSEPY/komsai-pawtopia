import { db } from "../../firebase";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

/**
 * Retrieves all adoption requests for a given post and includes user data.
 * @param {string} postId - The ID of the post (adoptable pet).
 * @returns {Promise<{ success: boolean, requests?: Array, message?: string }>}
 */
export const getAdoptionRequests = async (postId) => {
  try {
    const requestRef = collection(db, `posts/${postId}/adoptionRequests`);
    const querySnapshot = await getDocs(requestRef);

    // For each request, also fetch the user from the 'users' collection
    const requestsWithUser = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const requestData = { id: docSnap.id, ...docSnap.data() };

        // If the request has an adopterId referencing a document in the users collection
        if (requestData.adopterId) {
          const userDocRef = doc(db, "users", requestData.adopterId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Append the user's data to the request object
            requestData.userData = userDocSnap.data();
          }
        }
        return requestData;
      })
    );

    return { success: true, requests: requestsWithUser };
  } catch (error) {
    console.error("Error getting adoption requests:", error);
    return { success: false, message: "Failed to get adoption requests." };
  }
};
