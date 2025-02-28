import React from "react";
import EventCard from "./EventCard";
import { useEventPosts } from "../../../../hooks/useEventPosts";
import SkeletonLoader from "./SkeletonLoader";
import { useUserProfile } from "../../../../hooks/userProfile";

const Events = () => {
  const { eventPosts, isLoading, error } = useEventPosts();

  console.log("EvenPosts", eventPosts);

  const { userProfile, Loading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="max-w-4xl mt-8 grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!Array.isArray(eventPosts) || eventPosts.length === 0)
    return <p>No events available.</p>;

  return (
    <div className="max-w-4xl mt-8 grid grid-cols-1 gap-8">
      {eventPosts
        .filter((event) => event?.description) // ✅ Ensure valid events
        .map((event) => (
          <EventCard
            key={event.id}
            event={event} // ✅ Passing the entire event object to EventCard
            username={userProfile?.userName || "Unknown"}
            profileImg={userProfile?.profileImg || "/default-avatar.png"}
            isVerified={userProfile?.isVerified || false}
          />
        ))}
    </div>
  );
};

export default Events;
