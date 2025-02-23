import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  fetchUserLostPetPosts,
  fetchUserLostPetPostsById,
} from "../services/getLostPostService";

/**
 * SWR Hook to fetch lost pet posts for the currently logged-in user in real time.
 * @returns {Object} { lostPets, isLoading, isError }
 */
const useUserLostPetPosts = () => {
  const [lostPets, setLostPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // SWR fetcher function - Used for initial data fetch
  const fetcher = async () => {
    return new Promise((resolve, reject) => {
      fetchUserLostPetPosts(
        (updatedPosts) => resolve(updatedPosts),
        (error) => reject(error)
      );
    });
  };

  // SWR for data fetching and caching
  const { data, error } = useSWR("userLostPetPosts", fetcher, {
    revalidateOnFocus: false, // Prevents refetching when switching tabs
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      setLostPets(data);
      setIsLoading(false);
    }
    if (error) {
      setIsError(error);
      setIsLoading(false);
    }

    // Subscribe to real-time updates in Firestore
    const unsubscribe = fetchUserLostPetPosts((updatedPosts) => {
      setLostPets(updatedPosts);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [data, error]);

  return { lostPets, isLoading, isError };
};

/**
 * ✅ SWR Hook to fetch lost pet posts for a specific user by userId in real-time.
 * @param {string} userId - The Firestore user ID.
 * @returns {Object} { lostPets, isLoading, isError }
 */
export const useUserLostPetPostsById = (userId) => {
  const [lostPets, setLostPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    // Subscribe to real-time updates for the specified user
    const unsubscribe = fetchUserLostPetPostsById(userId, (updatedPosts) => {
      setLostPets(updatedPosts);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [userId]);

  return {
    lostPets,
    isLoading,
    isError,
  };
};

export default useUserLostPetPosts;
