import React from "react";
import { useParams } from "react-router-dom"; // ✅ Extract userId from URL
import { useStoriesById } from "../../../../hooks/useStories"; // ✅ Fetch by userId
import { useUser } from "../../../../hooks/useUser"; // ✅ Fetch user profile separately
import StoryCard from "./StoryCard";
import SkeletonLoader from "./SkeletonLoader";

const StoriesPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from URL
  const { stories, isLoading, error } = useStoriesById(userId); // ✅ Fetch stories for userId
  const { userData, isLoading: isUserLoading } = useUser(userId); // ✅ Fetch user profile separately

  if (isLoading || isUserLoading) {
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
    <div className=" mt-8 grid grid-cols-1 gap-8">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={{ ...story, username: userData?.userName || "Anonymous" }}
        />
      ))}
    </div>
  );
};

export default StoriesPreview;
