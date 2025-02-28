import React from "react";
import { useAdoptedPosts } from "../../../../hooks/useSuccessfulAdoption";
import AdoptedCard from "./AdoptedCard";
import SkeletonAdoptedCard from "./SkeletonAdoptedCard";

const AdoptedPetsList = () => {
  const { adoptedPosts, loading, error } = useAdoptedPosts();

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-6">
      {" "}
      {/* Flex column layout with gap */}
      {loading ? (
        // Show 3 skeleton loaders while loading
        <>
          <SkeletonAdoptedCard />
          <SkeletonAdoptedCard />
          <SkeletonAdoptedCard />
        </>
      ) : adoptedPosts.length === 0 ? (
        <p>No adopted pets found.</p>
      ) : (
        adoptedPosts.map((post) => (
          <AdoptedCard
            key={post.id}
            petName={post.petName}
            title={`Meet ${post.petName}!`}
            description={post.description}
            date={new Date(post.adoptedAt.seconds * 1000).toLocaleDateString()}
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
