import useSWR from "swr";
import { useEffect } from "react";
import {
  fetchAdoptedPostsRealtime,
  fetchUserAdoptedPostsRealtime,
} from "../services/successfulAdoptionService";

/**
 * SWR Hook to fetch all adopted pets in real-time and persist across tab switches.
 */
export const useAdoptedPosts = () => {
  const { data, mutate, isValidating, error } = useSWR(
    "adoptedPosts",
    () =>
      new Promise((resolve) =>
        fetchAdoptedPostsRealtime((posts) => {
          resolve(posts);
          mutate(posts, false); // Update SWR cache
        })
      ),
    { revalidateOnFocus: false }
  );

  return {
    adoptedPosts: data || [],
    loading: !data && isValidating, // Prevents unnecessary loading when switching tabs
    error,
  };
};

/**
 * SWR Hook to fetch adopted posts for a specific user (adopter).
 * @param {string} userId - The user ID of the adopter.
 */
export const useUserAdoptedPosts = (userId) => {
  const { data, mutate, isValidating, error } = useSWR(
    userId ? `adoptedPosts_${userId}` : null,
    () =>
      new Promise((resolve) =>
        fetchUserAdoptedPostsRealtime(userId, (posts) => {
          resolve(posts);
          mutate(posts, false); // Update SWR cache
        })
      ),
    { revalidateOnFocus: false }
  );

  return {
    userAdoptedPosts: data || [],
    loading: !data && isValidating, // Prevents unnecessary loading on tab switch
    error,
  };
};
