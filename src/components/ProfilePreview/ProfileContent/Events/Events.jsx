import React from "react";
import { useParams } from "react-router-dom"; // ✅ Extract userId from URL
import EventCard from "./EventCard";
import { useEventPostsById } from "../../../../hooks/useEventPosts"; // ✅ Use the ID-based hook
import { useUser } from "../../../../hooks/useUser"; // ✅ Use the correct profile hook
import SkeletonLoader from "./SkeletonLoader";

const EventsPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId for profile preview
  const { eventPosts, isLoading, error } = useEventPostsById(userId); // ✅ Fetch events for specific user
  const { userData, isLoading: isUserLoading } = useUser(userId); // ✅ Fetch user profile separately

  if (isLoading || isUserLoading) {
    return (
      <div className="max-w-4xl mt-8 grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!Array.isArray(eventPosts) || eventPosts.length === 0)
    return <p>No events available.</p>;

  return (
    <div className="max-w-4xl mt-8 grid grid-cols-1 gap-8">
      {eventPosts
        .filter((event) => event?.description) // ✅ Ensure valid events
        .map(({ id, description, createdAt, mediaUrls = [], tags = [] }) => (
          <EventCard
            key={id}
            event={{
              eventDescription: description, // ✅ Map correct field
              datePosted: createdAt, // ✅ Use Firestore timestamp
              mediaUrls, // ✅ Pass full media array instead of single image
              tags,
            }}
            username={userData?.userName || "Unknown"} // ✅ Use `useUser` data
            profileImg={userData?.profileImg || "/default-avatar.png"} // ✅ Use `useUser` data
            isVerified={userData?.isVerified || false} // ✅ Use `useUser` data
          />
        ))}
    </div>
  );
};

export default EventsPreview;
