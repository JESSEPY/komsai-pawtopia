import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Updates the user's profile image in Firestore.
 * @param {string} userId - The user ID.
 * @param {string} profileImageUrl - The new profile image URL.
 */
export const updateUserProfileImage = async (userId, profileImageUrl) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      profileImg: profileImageUrl, // ✅ Update only the profile image
    });
    console.log("✅ Profile image updated:", profileImageUrl);
  } catch (error) {
    console.error("❌ Error updating profile image:", error);
    throw error;
  }
};

/**
 * Updates the user's cover image in Firestore.
 * @param {string} userId - The user ID.
 * @param {string} coverImageUrl - The new cover image URL.
 */
export const updateUserCoverImage = async (userId, coverImageUrl) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      coverImage: coverImageUrl, // ✅ Update only the cover image
    });
    console.log("✅ Cover image updated:", coverImageUrl);
  } catch (error) {
    console.error("❌ Error updating cover image:", error);
    throw error;
  }
};

/**
 * Updates the user's profile description in Firestore.
 * @param {string} userId - The user ID.
 * @param {string} description - The new profile description.
 */
export const updateUserProfileDescription = async (userId, description) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      profileDescription: description, // ✅ Update only the profile description
    });
    console.log("✅ Profile description updated:", description);
  } catch (error) {
    console.error("❌ Error updating profile description:", error);
    throw error;
  }
};
