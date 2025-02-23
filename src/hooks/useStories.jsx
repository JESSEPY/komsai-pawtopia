import useSWR from "swr";
import { getStoriesByUser } from "../services/storyService";
import { getUserProfile } from "../services/userService";
import { useUserProfile } from "../hooks/userProfile";
import { useUser } from "../hooks/useUser";

/**
 * Fetch stories for the authenticated user.
 * @returns {Object} { stories, userProfile, isLoading, error }
 */
export const useStories = () => {
  const { userId, isLoading: userLoading, error: userError } = useUserProfile();

  const { data, error } = useSWR(
    userId ? `userStories-${userId}` : null,
    async () => {
      const stories = await getStoriesByUser(userId);
      return stories.map((story) => ({
        ...story,
        createdAt: story.createdAt?.seconds
          ? new Date(story.createdAt.seconds * 1000).toLocaleDateString()
          : "No date",
      }));
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  return {
    stories: data || [],
    isLoading: userLoading || (!data && !error),
    error: error || userError,
  };
};

/**
 * ✅ NEW: Fetch stories for a specific user by userId.
 * @param {string} userId - The ID of the user whose stories to fetch.
 * @returns {Object} { stories, userProfile, isLoading, error }
 */
export const useStoriesById = (userId) => {
  const { userData, isLoading: userLoading } = useUser(userId);

  const { data, error } = useSWR(
    userId ? `stories-${userId}` : null,
    async () => {
      const stories = await getStoriesByUser(userId);
      return stories.map((story) => ({
        ...story,
        createdAt: story.createdAt?.seconds
          ? new Date(story.createdAt.seconds * 1000).toLocaleDateString()
          : "No date",
      }));
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  return {
    stories: data || [],
    userProfile: userData || {},
    isLoading: userLoading || (!data && !error),
    error,
  };
};
