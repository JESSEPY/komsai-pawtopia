import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

/**
 * Fetch all pets that the currently logged-in adopter has successfully adopted.
 * Used as the initial fetcher for SWR.
 * @returns {Promise<Array>} A promise that resolves with the adopted pets data.
 */
export const fetchAdoptedPetsForAdopter = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No authenticated user found.");
      return [];
    }

    const postsRef = collection(db, "posts");

    const adoptedPetsQuery = query(
      postsRef,
      where("adoptedBy", "==", currentUser.uid),
      where("adoptionStatus", "==", "approved"),
      orderBy("adoptedAt", "desc")
    );

    const querySnapshot = await getDocs(adoptedPetsQuery);
    const adoptedPets = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const postData = docSnap.data();

        // Fetch shelter details
        const shelterRef = doc(db, "users", postData.userId);
        const shelterSnap = await getDoc(shelterRef);

        // Fetch the specific adoption request details
        const adoptionRequestsRef = collection(
          db,
          `posts/${docSnap.id}/adoptionRequests`
        );
        const adopterRequestQuery = query(
          adoptionRequestsRef,
          where("adopterId", "==", currentUser.uid),
          where("status", "==", "approved")
        );
        const adoptionRequestSnap = await getDocs(adopterRequestQuery);

        if (adoptionRequestSnap.empty) return null;

        return {
          id: docSnap.id,
          ...postData,
          shelter: shelterSnap.exists()
            ? {
                shelterId: postData.userId,
                shelterName: shelterSnap.data().userName,
                email: shelterSnap.data().email,
                isVerified: shelterSnap.data().isVerified,
              }
            : null,
          adoptionDetails: adoptionRequestSnap.docs.map((requestDoc) => ({
            id: requestDoc.id,
            ...requestDoc.data(),
          }))[0],
        };
      })
    );

    return adoptedPets.filter((pet) => pet !== null);
  } catch (error) {
    console.error("Error fetching adopted pets:", error);
    return [];
  }
};

/**
 * Fetch all pets for a given adopter UID.
 * Used as the initial fetcher for SWR.
 * @param {string} adopterUid - The adopter's UID.
 * @returns {Promise<Array>} A promise that resolves with the adopted pets data.
 */
export const fetchAdoptedPetsByUid = async (adopterUid) => {
  try {
    if (!adopterUid) {
      console.error("No adopter UID provided.");
      return [];
    }

    const postsRef = collection(db, "posts");

    const adoptedPetsQuery = query(
      postsRef,
      where("adoptedBy", "==", adopterUid),
      where("adoptionStatus", "==", "approved"),
      orderBy("adoptedAt", "desc")
    );

    const querySnapshot = await getDocs(adoptedPetsQuery);
    const adoptedPets = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const postData = docSnap.data();

        // Fetch shelter details
        const shelterRef = doc(db, "users", postData.userId);
        const shelterSnap = await getDoc(shelterRef);

        // Fetch the specific adoption request details
        const adoptionRequestsRef = collection(
          db,
          `posts/${docSnap.id}/adoptionRequests`
        );
        const adopterRequestQuery = query(
          adoptionRequestsRef,
          where("adopterId", "==", adopterUid),
          where("status", "==", "approved")
        );
        const adoptionRequestSnap = await getDocs(adopterRequestQuery);

        if (adoptionRequestSnap.empty) return null;

        return {
          id: docSnap.id,
          ...postData,
          shelter: shelterSnap.exists()
            ? {
                shelterId: postData.userId,
                shelterName: shelterSnap.data().userName,
                email: shelterSnap.data().email,
                isVerified: shelterSnap.data().isVerified,
              }
            : null,
          adoptionDetails: adoptionRequestSnap.docs.map((requestDoc) => ({
            id: requestDoc.id,
            ...requestDoc.data(),
          }))[0],
        };
      })
    );

    return adoptedPets.filter((pet) => pet !== null);
  } catch (error) {
    console.error("Error fetching adopted pets:", error);
    return [];
  }
};

/**
 * Subscribe to real-time updates for adopted pets for the currently logged-in adopter.
 * @param {Function} callback - Called with updated pets data on changes.
 * @param {Function} errorCallback - Called with error if one occurs.
 * @returns {Function} Unsubscribe function.
 */
export const subscribeAdoptedPetsForAdopter = (callback, errorCallback) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.error("No authenticated user found.");
    return () => {};
  }

  const postsRef = collection(db, "posts");

  const adoptedPetsQuery = query(
    postsRef,
    where("adoptedBy", "==", currentUser.uid),
    where("adoptionStatus", "==", "approved"),
    orderBy("adoptedAt", "desc")
  );

  const unsubscribe = onSnapshot(
    adoptedPetsQuery,
    async (querySnapshot) => {
      const pets = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();

          const shelterRef = doc(db, "users", postData.userId);
          const shelterSnap = await getDoc(shelterRef);

          const adoptionRequestsRef = collection(
            db,
            `posts/${docSnap.id}/adoptionRequests`
          );
          const adopterRequestQuery = query(
            adoptionRequestsRef,
            where("adopterId", "==", currentUser.uid),
            where("status", "==", "approved")
          );
          const adoptionRequestSnap = await getDocs(adopterRequestQuery);

          if (adoptionRequestSnap.empty) return null;

          return {
            id: docSnap.id,
            ...postData,
            shelter: shelterSnap.exists()
              ? {
                  shelterId: postData.userId,
                  shelterName: shelterSnap.data().userName,
                  email: shelterSnap.data().email,
                  isVerified: shelterSnap.data().isVerified,
                }
              : null,
            adoptionDetails: adoptionRequestSnap.docs.map((requestDoc) => ({
              id: requestDoc.id,
              ...requestDoc.data(),
            }))[0],
          };
        })
      );
      callback(pets.filter((pet) => pet !== null));
    },
    errorCallback
  );

  return unsubscribe;
};

/**
 * Subscribe to real-time updates for adopted pets for a specific adopter UID.
 * @param {string} adopterUid - The adopter's UID.
 * @param {Function} callback - Called with updated pets data on changes.
 * @param {Function} errorCallback - Called with error if one occurs.
 * @returns {Function} Unsubscribe function.
 */
export const subscribeAdoptedPetsByUid = (
  adopterUid,
  callback,
  errorCallback
) => {
  if (!adopterUid) {
    console.error("No adopter UID provided.");
    return () => {};
  }

  const postsRef = collection(db, "posts");

  const adoptedPetsQuery = query(
    postsRef,
    where("adoptedBy", "==", adopterUid),
    where("adoptionStatus", "==", "approved"),
    orderBy("adoptedAt", "desc")
  );

  const unsubscribe = onSnapshot(
    adoptedPetsQuery,
    async (querySnapshot) => {
      const pets = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();

          const shelterRef = doc(db, "users", postData.userId);
          const shelterSnap = await getDoc(shelterRef);

          const adoptionRequestsRef = collection(
            db,
            `posts/${docSnap.id}/adoptionRequests`
          );
          const adopterRequestQuery = query(
            adoptionRequestsRef,
            where("adopterId", "==", adopterUid),
            where("status", "==", "approved")
          );
          const adoptionRequestSnap = await getDocs(adopterRequestQuery);

          if (adoptionRequestSnap.empty) return null;

          return {
            id: docSnap.id,
            ...postData,
            shelter: shelterSnap.exists()
              ? {
                  shelterId: postData.userId,
                  shelterName: shelterSnap.data().userName,
                  email: shelterSnap.data().email,
                  isVerified: shelterSnap.data().isVerified,
                }
              : null,
            adoptionDetails: adoptionRequestSnap.docs.map((requestDoc) => ({
              id: requestDoc.id,
              ...requestDoc.data(),
            }))[0],
          };
        })
      );
      callback(pets.filter((pet) => pet !== null));
    },
    errorCallback
  );

  return unsubscribe;
};
