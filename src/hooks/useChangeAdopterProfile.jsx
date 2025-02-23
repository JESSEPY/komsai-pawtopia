import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinaryService";
import {
  updateUserProfileImage,
  updateUserCoverImage,
  updateUserProfileDescription,
} from "../services/changeAdopterProfileService"; // Firestore update service
import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../components/ListAPet/Swalloader";
import { useUserProfile } from "./userProfile"; // Fetch user profile

export const useChangeUserProfile = () => {
  const { userProfile } = useUserProfile(); // Fetch user profile
  const [loading, setLoading] = useState(false);

  /**
   * Handles updating Profile or Cover Image
   * @param {File} file - The image file to upload.
   * @param {string} fieldType - "profileImg" or "coverImage".
   */
  const updateImage = async (file, fieldType) => {
    if (!userProfile?.uid || !file) {
      console.warn("⚠️ Missing user profile or file.");
      return;
    }

    try {
      setLoading(true);
      showUploadingSwal();
      console.log(`📤 Starting ${fieldType} update...`);

      const userId = userProfile.uid;
      const currentImage = userProfile?.[fieldType];
      let publicId = null;

      // Extract public_id from current image
      if (currentImage) {
        try {
          const segments = currentImage.split("/");
          const lastSegment = segments[segments.length - 1];
          if (lastSegment.includes(".")) {
            publicId = lastSegment.split(".")[0];
          }
        } catch (error) {
          console.warn(
            `⚠️ Error extracting public_id for ${fieldType}, skipping deletion:`,
            error
          );
        }
      }

      // Delete old image if exists
      if (publicId) {
        console.log(`🗑️ Deleting old ${fieldType}:`, publicId);
        const deletionSuccess = await deleteFromCloudinary(publicId);
        if (!deletionSuccess) {
          console.warn(`⚠️ Failed to delete old ${fieldType}, continuing...`);
        }
      }

      // Upload new image
      console.log(`📤 Uploading new ${fieldType}...`);
      const [imageUrl] = await uploadToCloudinary(
        [file],
        fieldType === "profileImg" ? "profile_images" : "cover_images"
      );
      console.log(`✅ New ${fieldType} uploaded:`, imageUrl);

      // Cache busting to prevent stale images
      const cacheBustedImageUrl = `${imageUrl}?t=${new Date().getTime()}`;

      // Update Firestore
      if (fieldType === "profileImg") {
        await updateUserProfileImage(userId, cacheBustedImageUrl);
      } else if (fieldType === "coverImage") {
        await updateUserCoverImage(userId, cacheBustedImageUrl);
      }

      console.log(`✅ Firestore updated with new ${fieldType}.`);

      // Clear local storage cache to prevent stale data
      localStorage.removeItem(`userProfile_${userId}`);

      // Update SWR cache
      mutate();

      showSuccessSwal(
        `${
          fieldType === "profileImg" ? "Profile image" : "Cover image"
        } updated successfully!`
      );
    } catch (error) {
      console.error(`❌ Error updating ${fieldType}:`, error);
      showErrorSwal(`Failed to update ${fieldType}.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates the profile image separately.
   * @param {File} file - The profile image file.
   */
  const updateProfileImage = (file) => updateImage(file, "profileImg");

  /**
   * Updates the cover image separately.
   * @param {File} file - The cover image file.
   */
  const updateCoverImage = (file) => updateImage(file, "coverImage");

  /**
   * Updates the profile description in Firestore.
   * @param {string} description - The new profile description.
   */
  const updateProfileDescription = async (description) => {
    if (!userProfile?.uid) {
      console.warn("⚠️ Missing user profile.");
      return;
    }

    try {
      setLoading(true);
      console.log("📝 Updating profile description...");
      await updateUserProfileDescription(userProfile.uid, description);

      // Update SWR cache
      mutate();
      showSuccessSwal("Profile description updated!");
    } catch (error) {
      console.error("❌ Error updating profile description:", error);
      showErrorSwal("Failed to update profile description.");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfileImage,
    updateCoverImage,
    updateProfileDescription,
    loading,
  };
};
