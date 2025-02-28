import React from "react";
import { useStories } from "../../../../hooks/useStories"; // Adjust path as needed
import { useUserProfile } from "../../../../hooks/userProfile";
import StoryCard from "./StoryCard";
import SkeletonLoader from "./SkeletonLoader"; // Adjust path if needed

const Stories = () => {
  const { stories, isLoading, error } = useStories();
  const { userProfile } = useUserProfile();
  console.log("Fetched Stories:", stories);
  console.log("User Profile:", userProfile);

  if (isLoading) {
    return (
      <div className=" mt-8 grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error: {error.message || "An error occurred while fetching stories."}
      </p>
    );
  }

  if (!stories.length) {
    return <p>No stories available.</p>;
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={{ ...story, username: userProfile?.userName || "Anonymous" }}
        />
      ))}
    </div>
  );
};

export default Stories;
