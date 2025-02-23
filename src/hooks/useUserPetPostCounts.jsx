import { useState, useEffect } from "react";
import {
  subscribeToUserPetPostCounts,
  subscribeToUserPetPostCountsById,
} from "../services/userAdoptablesService";

/**
 * ✅ Custom hook to fetch and listen for real-time updates on the logged-in user's "List a Pet" post counts.
 * @returns {{ totalListAPet: number, approvedCount: number }}
 */
const useUserPetPostCounts = () => {
  const [stats, setStats] = useState({ totalListAPet: 0, approvedCount: 0 });

  useEffect(() => {
    const unsubscribe = subscribeToUserPetPostCounts(setStats);

    return () => unsubscribe(); // Cleanup listener when unmounted
  }, []);

  return stats;
};

/**
 * ✅ NEW: Custom hook to fetch and listen for real-time updates on a specific user's "List a Pet" post counts.
 * ✅ Fetches data for any user by userId.
 * @param {string} userId - The user ID to track.
 * @returns {{ totalListAPet: number, approvedCount: number }}
 */
export const useUserPetPostCountsById = (userId) => {
  const [stats, setStats] = useState({ totalListAPet: 0, approvedCount: 0 });

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToUserPetPostCountsById(userId, setStats);

    return () => unsubscribe(); // Cleanup listener when unmounted
  }, [userId]);

  return stats;
};

export default useUserPetPostCounts;
