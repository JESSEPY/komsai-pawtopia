import useSWR from "swr";
import { fetchLostPetPosts } from "../services/getLostPostService"; // Import your service function

const useLostPetPosts = () => {
  const { data, error, isValidating, mutate } = useSWR(
    "lostPets", // Cache key
    fetchLostPetPosts, // Fetcher function from postService.js
    {
      revalidateOnFocus: true, // Auto re-fetch when tab is focused
      revalidateOnReconnect: true, // Auto re-fetch when internet reconnects
      refreshInterval: 60000, // Auto refresh every 60 seconds
    }
  );

  return {
    lostPets: data || [], // Default to empty array if no data
    isLoading: !error && !data, // Show loading state
    isError: error, // Handle errors
    isValidating, // SWR's built-in re-fetching indicator
    mutate, // Function to manually refresh
  };
};

export default useLostPetPosts;
