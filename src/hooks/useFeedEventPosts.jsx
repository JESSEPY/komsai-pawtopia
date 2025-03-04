import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  fetchEventPosts,
  subscribeToEventPosts,
} from "../services/feedEventService";

export const useFeedEventPosts = () => {
  const {
    data: cachedEventPosts,
    error,
    mutate,
  } = useSWR(
    "eventPosts",
    async () => {
      const posts = await fetchEventPosts();
      return posts.filter((post) => post.postStatus !== "unlisted");
    },
    {
      dedupingInterval: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  const [eventPosts, setEventPosts] = useState(cachedEventPosts || []);

  useEffect(() => {
    console.log("📡 Listening for real-time event post updates...");
    const unsubscribe = subscribeToEventPosts((updatedPosts) => {
      console.log("🔄 Real-time event posts updated");

      // Filter out unlisted posts from real-time updates
      const filteredUpdatedPosts = updatedPosts.filter(
        (post) => post.postStatus !== "unlisted"
      );

      // Merge new event posts with existing ones smoothly
      setEventPosts((prevPosts) => {
        const mergedPosts = [...filteredUpdatedPosts, ...prevPosts].reduce(
          (acc, post) => {
            if (!acc.some((p) => p.id === post.id)) acc.push(post);
            return acc;
          },
          []
        );
        return mergedPosts;
      });

      mutate(filteredUpdatedPosts, false);
    });

    return () => unsubscribe();
  }, [mutate]);

  useEffect(() => {
    if (cachedEventPosts) {
      setEventPosts(cachedEventPosts);
    }
  }, [cachedEventPosts]);

  return {
    eventPosts,
    loadingEventPosts: !cachedEventPosts && !error,
    errorEventPosts: error,
  };
};
