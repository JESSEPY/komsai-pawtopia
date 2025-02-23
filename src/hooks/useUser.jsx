// src/hooks/useUser.js
import useSWR from "swr";
import { fetchUser } from "../services/getPostService";

/**
 * Hook to fetch user data with SWR caching and revalidation.
 * @param {string} userId - The ID of the user in Firestore.
 * @returns {Object} { userData, isLoading, error }
 */
export const useUser = (userId) => {
  const { data: userData, error } = useSWR(
    userId ? `user-${userId}` : null, // Unique cache key per user
    () => fetchUser(userId), // Fetch function
    { revalidateOnFocus: false } // Avoid unnecessary refetching on window focus
  );

  return {
    userData,
    isLoading: !userData && !error,
    error,
  };
};
