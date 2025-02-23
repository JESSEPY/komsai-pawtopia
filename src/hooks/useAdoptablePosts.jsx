import { useEffect } from "react";
import useSWR from "swr";
import { useUserProfile } from "../hooks/userProfile"; // Adjust the path if needed
import {
  getAdoptablePostsForUser,
  subscribeAdoptablePostsForUser,
} from "../services/getAdoptablePostsForUser"; // Adjust the path if needed

export const useAdoptablePosts = () => {
  // Get the current authenticated user's ID
  const { userId, isLoading: userLoading, error: userError } = useUserProfile();

  // SWR fetcher for initial data
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `adoptablePosts-${userId}` : null,
    async () => {
      const posts = await getAdoptablePostsForUser(userId);
      return posts.filter((post) => post.postStatus !== "unlisted");
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  // Subscribe to realtime updates and update SWR cache when data changes
  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeAdoptablePostsForUser(
      userId,
      (posts) => {
        const filteredPosts = posts.filter(
          (post) => post.postStatus !== "unlisted"
        );
        mutate(filteredPosts, false);
      },
      (err) => {
        console.error("Realtime subscription error:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId, mutate]);

  return {
    adoptablePosts: data || [],
    isLoading: userLoading || isLoading,
    error: error || userError,
  };
};
/**
 * Fetches adoptable posts for a given user ID using SWR and realtime updates.
 * @param {string} userId - The ID of the user.
 * @returns {Object} { adoptablePosts, isLoading, error }
 */
export const useAdoptablePostsById = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `adoptablePosts-${userId}` : null,
    async () => {
      const posts = await getAdoptablePostsForUser(userId);
      return posts.filter((post) => post.postStatus !== "unlisted");
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeAdoptablePostsForUser(
      userId,
      (posts) => {
        const filteredPosts = posts.filter(
          (post) => post.postStatus !== "unlisted"
        );
        mutate(filteredPosts, false);
      },
      (err) => {
        console.error("Realtime subscription error:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId, mutate]);

  return {
    adoptablePosts: data || [],
    isLoading: !data && !error,
    error,
  };
};
