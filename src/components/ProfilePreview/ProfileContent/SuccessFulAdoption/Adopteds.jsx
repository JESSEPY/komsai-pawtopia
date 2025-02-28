import React from "react";
import {
  useAdoptedPosts,
  useUserAdoptedPosts,
} from "../../../../hooks/useSuccessfulAdoption";
import AdoptedCard from "./AdoptedCard";
import SkeletonAdoptedCard from "./SkeletonAdoptedCard";
import { useParams } from "react-router-dom";

const AdoptedPetsList = () => {
  const { userId } = useParams();
  const { userAdoptedPosts, loading, error } = useUserAdoptedPosts(userId);

  console.log("adoptedPostsByUser", userAdoptedPosts);

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <>
          <SkeletonAdoptedCard />
          <SkeletonAdoptedCard />
          <SkeletonAdoptedCard />
        </>
      ) : Array.isArray(userAdoptedPosts) && userAdoptedPosts.length === 0 ? (
        <p>No adopted pets found.</p>
      ) : (
        (userAdoptedPosts || []).map((post) => (
          <AdoptedCard
            key={post.id}
            petName={post.petName}
            title={`Meet ${post.petName}!`}
            description={post.description}
            date={
              post.adoptedAt
                ? new Date(post.adoptedAt.seconds * 1000).toLocaleDateString()
                : "Unknown"
            }
            mediaUrls={post.mediaUrls}
            adopterName={post.adopterDetails?.userName}
            tags={post.tags}
          />
        ))
      )}
    </div>
  );
};

export default AdoptedPetsList;
