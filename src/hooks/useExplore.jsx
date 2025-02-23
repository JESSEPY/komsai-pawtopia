// src/hooks/useListAPetPosts.js
import useSWR from "swr";
import { fetchListAPetPosts } from "../services/exploreService"; // Updated to match your Lost Pet service

const useListAPetPosts = () => {
  const { data, error, isValidating, mutate } = useSWR(
    "listAPetPosts", // Cache key
    fetchListAPetPosts, // Fetcher function
    {
      revalidateOnFocus: true, // Auto re-fetch when tab is focused
      revalidateOnReconnect: true, // Auto re-fetch when internet reconnects
      refreshInterval: 60000, // Auto refresh every 60 seconds
    }
  );

  return {
    posts: data || [], // Default to empty array if no data
    isLoading: !error && !data, // Show loading state only when there's no error or data
    isError: error, // Handle errors
    isValidating, // SWR's built-in re-fetching indicator
    mutate, // Function to manually refresh
  };
};

export default useListAPetPosts;
