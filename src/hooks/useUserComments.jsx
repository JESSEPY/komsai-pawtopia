import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import {
  getUserCommentsAndReplies,
  getUserCommentsAndRepliesById,
  subscribeToUserCommentsAndReplies,
  subscribeToUserCommentsAndRepliesById,
} from "../services/getProfileCommentsService";
import { auth } from "../../firebase";

/**
 * SWR Hook to fetch comments and replies for the currently logged-in user.
 */
export const useUserComments = () => {
  const fetcher = async () => await getUserCommentsAndReplies();

  const { data, error } = useSWR("userComments", fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = subscribeToUserCommentsAndReplies(
      (newComments) => {
        mutate(
          "userComments",
          (prevData = {}) => ({
            ...prevData,
            comments: newComments,
          }),
          false
        );
      },
      (newReplies) => {
        mutate(
          "userComments",
          (prevData = {}) => ({
            ...prevData,
            replies: newReplies,
          }),
          false
        );
      },
      (err) => console.error("Real-time subscription error:", err)
    );

    return () => unsubscribe();
  }, []);

  return {
    comments: data?.comments || [],
    replies: data?.replies || [],
    isLoading: !data && !error,
    isError: error,
  };
};

/**
 * ✅ NEW: SWR Hook to fetch comments and replies for a specific user by userId.
 */
export const useUserCommentsById = (userId) => {
  const fetcher = async () => {
    if (!userId) return { comments: [], replies: [] };
    return await getUserCommentsAndRepliesById(userId);
  };

  const { data, error } = useSWR(
    userId ? `userComments-${userId}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToUserCommentsAndRepliesById(
      userId,
      (newComments) => {
        mutate(
          `userComments-${userId}`,
          (prevData = {}) => ({
            ...prevData,
            comments: newComments,
          }),
          false
        );
      },
      (newReplies) => {
        mutate(
          `userComments-${userId}`,
          (prevData = {}) => ({
            ...prevData,
            replies: newReplies,
          }),
          false
        );
      },
      (err) => console.error("Real-time subscription error:", err)
    );

    return () => unsubscribe();
  }, [userId]);

  return {
    comments: data?.comments || [],
    replies: data?.replies || [],
    isLoading: !data && !error,
    isError: error,
  };
};
