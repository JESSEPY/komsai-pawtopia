import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinaryService";

/**
 * Fetches an adoptable post from Firestore.
 */
export const getAdoptablePost = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("❌ No such post found!");
      return null;
    }
    return { id: postId, ...docSnap.data() };
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    throw error;
  }
};

/**
 * Updates an adoptable post in Firestore.
 */
export const updateAdoptablePost = async (postId, updatedData) => {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, updatedData);
    return true;
  } catch (error) {
    console.error("❌ Error updating post:", error);
    throw error;
  }
};

/**
 * Replaces old images with new ones in Cloudinary and Firestore.
 * ✅ Ensures Firestore only stores URLs, not `File` objects.
 */
export const updateAdoptableMedia = async (
  postId,
  newMediaFiles,
  existingMediaUrls
) => {
  try {
    // 🔥 STEP 1: DELETE OLD IMAGES FROM CLOUDINARY
    if (existingMediaUrls.length > 0) {
      for (const url of existingMediaUrls) {
        const publicId = extractCloudinaryPublicId(url);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }
    }

    // 🔥 STEP 2: UPLOAD NEW IMAGES TO CLOUDINARY
    const uploadedUrls =
      newMediaFiles.length > 0 ? await uploadToCloudinary(newMediaFiles) : [];

    // 🔥 STEP 3: UPDATE FIRESTORE WITH NEW IMAGE URLs ONLY
    await updateAdoptablePost(postId, { mediaUrls: uploadedUrls });

    return uploadedUrls;
  } catch (error) {
    console.error("❌ Error updating media:", error);
    throw error;
  }
};

/**
 * Deletes a specific image from Cloudinary and Firestore.
 */
export const removeAdoptableMedia = async (
  postId,
  mediaUrl,
  existingMediaUrls
) => {
  try {
    const publicId = extractCloudinaryPublicId(mediaUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    // Remove the deleted image from Firestore
    const updatedMediaUrls = existingMediaUrls.filter(
      (url) => url !== mediaUrl
    );
    await updateAdoptablePost(postId, { mediaUrls: updatedMediaUrls });

    return updatedMediaUrls;
  } catch (error) {
    console.error("❌ Error removing media:", error);
    throw error;
  }
};

/**
 * 🔥 Soft Deletes an adoptable post (Unlist Instead of Delete).
 */
export const unlistAdoptablePost = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, { postStatus: "unlisted" });

    console.log(`✅ Post ${postId} successfully unlisted.`);
    return true;
  } catch (error) {
    console.error("❌ Error unlisting post:", error);
    throw error;
  }
};

/**
 * 🔥 Fully Deletes an Adoptable Post (Firestore + Cloudinary)
 *    - Removes images from Cloudinary
 *    - Deletes post from Firestore
 */
export const deleteAdoptablePost = async (postId, mediaUrls) => {
  try {
    // 🔥 Step 1: Delete all images from Cloudinary
    if (mediaUrls && mediaUrls.length > 0) {
      for (const url of mediaUrls) {
        const publicId = extractCloudinaryPublicId(url);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }
    }

    // 🔥 Step 2: Delete post from Firestore
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);

    console.log(`✅ Post ${postId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    throw error;
  }
};

/**
 * 🔍 Extracts Cloudinary Public ID from URL (Needed for Deletion).
 */
const extractCloudinaryPublicId = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  return parts.length > 0 ? parts.pop().split(".")[0] : null;
};
