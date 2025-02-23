import { useState, useEffect } from "react";
import { fetchEventsByUserRealtime } from "../services/eventService";
import { getUserProfile } from "../services/userService";
import { useUserProfile } from "../hooks/userProfile";
import useSWR from "swr";

/**
 * ✅ Fetch event posts & profile for the authenticated user in real-time.
 * @returns {Object} { eventPosts, userProfile, isLoading, error }
 */
export const useEventPosts = () => {
  const { userId, isLoading: userLoading, error: userError } = useUserProfile();
  const [eventPosts, setEventPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile using SWR
  const { data: userProfile, error: profileError } = useSWR(
    userId ? `userProfile-${userId}` : null,
    () => getUserProfile(userId),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  useEffect(() => {
    if (!userId) return;

    let unsubscribe;
    setLoading(true);

    // Fetch event posts in real-time
    unsubscribe = fetchEventsByUserRealtime(userId, (events) => {
      const sortedEvents = events.sort((a, b) => b.createdAt - a.createdAt);
      setEventPosts(sortedEvents);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  return {
    eventPosts,
    userProfile: userProfile || {},
    isLoading: userLoading || loading,
    error: error || userError || profileError,
  };
};

/**
 * ✅ Fetch event posts & profile for a specific user in real-time.
 * @param {string} userId - The user ID to fetch events for.
 * @returns {Object} { eventPosts, userProfile, isLoading, error }
 */
export const useEventPostsById = (userId) => {
  const [eventPosts, setEventPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile using SWR
  const { data: userProfile, error: profileError } = useSWR(
    userId ? `userProfile-${userId}` : null,
    () => getUserProfile(userId),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  useEffect(() => {
    if (!userId) return;

    let unsubscribe;
    setLoading(true);

    // Fetch event posts in real-time
    unsubscribe = fetchEventsByUserRealtime(userId, (events) => {
      const sortedEvents = events.sort((a, b) => b.createdAt - a.createdAt);
      setEventPosts(sortedEvents);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  return {
    eventPosts,
    userProfile: userProfile || {},
    isLoading: loading,
    error: error || profileError,
  };
};
