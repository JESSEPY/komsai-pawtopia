import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { auth } from "../../firebase";
import {
  fetchAdopterProfile,
  updateAdopterHobbies,
  subscribeAdoptionMetrics,
  updateAdopterCoverImage, // ✅ Ensure Firestore updates
} from "../services/getAdopterBioService";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinaryService";
import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../components/ListAPet/Swalloader"; // ✅ Using Swal loaders

export const useAdopterBio = () => {
  const [userId, setUserId] = useState(null);
  const [metrics, setMetrics] = useState({
    adoptedCount: 0,
    pendingCount: 0,
    commentCount: 0,
  });
  const [metricsLoading, setMetricsLoading] = useState(true);

  // 🔄 Monitor authentication state & set userId
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribeAuth();
  }, []);

  // 🔄 SWR Fetcher for profile data (with localStorage caching)
  const {
    data: adopterData,
    mutate: mutateProfile,
    isValidating,
    error,
  } = useSWR(
    userId ? `/users/${userId}` : null,
    async () => {
      const cachedProfile = localStorage.getItem(`adopterProfile_${userId}`);
      if (cachedProfile) return JSON.parse(cachedProfile);

      const profile = await fetchAdopterProfile(userId);
      if (profile)
        localStorage.setItem(
          `adopterProfile_${userId}`,
          JSON.stringify(profile)
        );
      return profile;
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Auto refresh every 30s
    }
  );

  // 📡 Subscribe to real-time adoption metrics
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeAdoptionMetrics(userId, (updateFn) => {
      setMetrics((prev) => updateFn(prev));
      setMetricsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // ✏️ Function to update hobbies dynamically
  const updateHobbies = async (newHobbies) => {
    if (!userId) return;
    console.log("✏️ Updating hobbies:", newHobbies);

    try {
      await updateAdopterHobbies(userId, newHobbies);

      // ✅ Update SWR cache
      mutateProfile(
        (prev) => ({
          ...prev,
          adoptionData: {
            ...prev.adoptionData,
            personal: {
              ...prev.adoptionData.personal,
              hobbies: newHobbies,
            },
          },
        }),
        false
      );

      showSuccessSwal("Hobbies updated successfully!"); // ✅ Success notification
    } catch (error) {
      console.error("❌ Error updating hobbies:", error);
      showErrorSwal("Failed to update hobbies."); // ❌ Error notification
    }
  };
  const updateCoverImage = async (file) => {
    if (!userId || !file) return;

    try {
      showUploadingSwal();

      const currentCoverImage = adopterData?.coverImage;
      const publicId = currentCoverImage
        ? currentCoverImage.split("/").pop().split(".")[0]
        : null;

      if (publicId) {
        console.log("🗑️ Deleting old cover image:", publicId);
        await deleteFromCloudinary(publicId);
      }

      const [imageUrl] = await uploadToCloudinary([file], "cover_images");
      const cacheBustedImageUrl = `${imageUrl}?t=${new Date().getTime()}`;

      await updateAdopterCoverImage(userId, cacheBustedImageUrl);

      // ✅ Clear local storage to avoid stale data
      localStorage.removeItem(`adopterProfile_${userId}`);

      // ✅ Update SWR cache instantly
      await mutateProfile(
        (prev) => ({
          ...prev,
          coverImage: cacheBustedImageUrl,
        }),
        false
      );

      showSuccessSwal("Cover image updated successfully!");
    } catch (error) {
      console.error("❌ Error updating cover image:", error);
      showErrorSwal("Failed to update cover image.");
    }
  };

  return {
    adopterData,
    metrics,
    loading: !adopterData && !error,
    metricsLoading,
    isValidating,
    updateCoverImage,
    updateHobbies,
    mutate,
  };
};
