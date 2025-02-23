import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetchPosts, subscribeToPosts } from "../services/feedPostService";

/**
 * SWR Hook to fetch and manage posts (excluding unlisted posts).
 */
export const usePosts = () => {
  const {
    data: cachedPosts,
    error,
    mutate,
  } = useSWR(
    "posts",
    async () => {
      const posts = await fetchPosts();
      return posts.filter((post) => post.postStatus !== "unlisted"); // Filter out unlisted posts
    },
    {
      dedupingInterval: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  const [posts, setPosts] = useState(cachedPosts || []);

  useEffect(() => {
    console.log("📡 Listening for real-time post updates...");
    const unsubscribe = subscribeToPosts((updatedPosts) => {
      console.log("🔄 Real-time posts updated");

      // Filter out unlisted posts from real-time updates
      const filteredUpdatedPosts = updatedPosts.filter(
        (post) => post.postStatus !== "unlisted"
      );

      // Merge new posts with existing ones smoothly
      setPosts((prevPosts) => {
        const mergedPosts = [...filteredUpdatedPosts, ...prevPosts].reduce(
          (acc, post) => {
            if (!acc.some((p) => p.id === post.id)) acc.push(post);
            return acc;
          },
          []
        );
        return mergedPosts;
      });

      mutate(filteredUpdatedPosts, false); // Update SWR cache without UI reset
    });

    return () => unsubscribe();
  }, [mutate]);

  useEffect(() => {
    if (cachedPosts) {
      setPosts(cachedPosts); // Sync cache updates
    }
  }, [cachedPosts]);

  return {
    posts,
    loadingPosts: !cachedPosts && !error,
    errorPosts: error,
  };
};
