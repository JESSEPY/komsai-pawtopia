// services/adoptionService.js
import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  collectionGroup,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { uploadToCloudinary } from "./cloudinaryService";
export const submitAdoptionForms = async ({
  personalData,
  questionnaireData,
  homePhotos,
  validIds,
}) => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Upload images if available
  const homePhotosUrls =
    homePhotos && homePhotos.length > 0
      ? await uploadToCloudinary(homePhotos, "home_photos")
      : [];
  const validIdsUrls =
    validIds && validIds.length > 0
      ? await uploadToCloudinary(validIds, "valid_ids")
      : [];

  // Combine media URLs with the personal form data
  const personalDataWithMedia = {
    ...personalData,
    mediaUrls: {
      homePhotos: homePhotosUrls,
      validIds: validIdsUrls,
    },
  };

  // Remove File objects from questionnaireData before saving to Firestore
  const questionnaireDataWithoutFiles = { ...questionnaireData };
  if (questionnaireDataWithoutFiles.homePhotos) {
    delete questionnaireDataWithoutFiles.homePhotos;
  }
  if (questionnaireDataWithoutFiles.validId) {
    delete questionnaireDataWithoutFiles.validId;
  }

  // Update the user's document in Firestore
  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, {
    adoptionData: {
      personal: personalDataWithMedia,
      questionnaire: questionnaireDataWithoutFiles,
    },
    isVerified: true,
  });
};

/**
 * Listens to real-time adoption request status updates for a given post and request ID.
 * @param {string} postId - The ID of the post.
 * @param {string} requestId - The ID of the adoption request.
 * @param {function} callback - Function to handle status updates.
 * @returns {function|null} Unsubscribe function to stop listening.
 */
export const listenToAdoptionStatus = (postId, requestId, callback) => {
  if (!postId || !requestId) return null;

  const requestDocRef = doc(
    db,
    `posts/${postId}/adoptionRequests/${requestId}`
  );

  // Subscribe to Firestore updates on the adoption request document
  const unsubscribe = onSnapshot(requestDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback(data.status || "Unknown"); // Fetch `status` field instead of `adoptionStatus`
    } else {
      callback("Unknown"); // Handle case where request doesn't exist
    }
  });

  return unsubscribe; // Function to stop listening when needed
};
