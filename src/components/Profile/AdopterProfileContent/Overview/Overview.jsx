import React, { useMemo, useState } from "react";
import Masonry from "react-masonry-css";

// Hooks
import { useAdoptedPets } from "../../../../hooks/useAdoptedPets";
import useUserLostPetPosts from "../../../../hooks/useUserLostPetPosts";
import { useUserComments } from "../../../../hooks/useUserComments";

// Components
import AdoptableCard from "../Adopted/AdoptableCard";
import FindCard from "../Lost/FindCard";
import CommentCard from "../Comment/CommentCard";

// Skeleton Loaders
import SkeletonLoader from "../Adopted/AdoptedSkeletonLoader";
import FindCardSkeleton from "../../../Find/FindCardSkeleton";
import CommentSkeleton from "../Comment/CommentSkeleton";

import FindModal from "../Lost/FindModal";

const OverviewCombined = () => {
  // Fetch data from hooks
  const {
    lostPets,
    isLoading: isLostLoading,
    isError: isLostError,
  } = useUserLostPetPosts();
  const {
    data: adoptedPets,
    isLoading: isAdoptedLoading,
    error: adoptedError,
  } = useAdoptedPets();
  const {
    comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useUserComments();

  // Combined Loading & Error States
  const isLoading = isLostLoading || isAdoptedLoading || isCommentsLoading;
  const isError = isLostError || adoptedError || isCommentsError;

  // Lost Pet Modal Handling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  // Merge and prioritize sorting
  const sortedData = useMemo(() => {
    if (isLoading || isError) return [];

    const adoptedArray =
      adoptedPets?.map((pet) => ({
        type: "adopted",
        createdAt: pet.createdAt,
        ...pet,
      })) || [];

    const lostArray =
      lostPets?.map((pet) => ({
        type: "lost",
        createdAt: pet.createdAt,
        lostStatus: pet.lostStatus,
        ...pet,
      })) || [];

    const commentArray =
      comments?.map((comment) => ({
        type: "comment",
        createdAt: comment.createdAt,
        ...comment,
      })) || [];

    // Prioritize: AdoptableCard (always on top), then FindCard with `lostStatus: "lost"`, then everything else sorted by timestamp
    const lostStatusLost = lostArray.filter(
      (pet) => pet.lostStatus === "resolved"
    );
    const restLost = lostArray.filter((pet) => pet.lostStatus !== "resolved");

    const sortedRest = [...restLost, ...commentArray].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return [...adoptedArray, ...lostStatusLost, ...sortedRest];
  }, [lostPets, adoptedPets, comments, isLoading, isError]);

  console.log("Combined Sorted Data", sortedData);

  // Breakpoints for react-masonry-css
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
  };

  // Handle Loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {[...Array(3)].map((_, i) => (
          <FindCardSkeleton key={`lost-skel-${i}`} />
        ))}
        {[...Array(3)].map((_, i) => (
          <SkeletonLoader key={`adopt-skel-${i}`} />
        ))}
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={`comm-skel-${i}`} />
        ))}
      </div>
    );
  }

  // Handle Error
  if (isError) {
    return <p className="text-red-500 p-4">Error fetching data.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {sortedData.length === 0 ? (
          <p className="text-gray-600 col-span-2">No data available.</p>
        ) : (
          sortedData.map((item) => {
            switch (item.type) {
              case "adopted":
                return (
                  <div key={item.id} style={{ marginBottom: "1rem" }}>
                    <AdoptableCard
                      petName={item.petName}
                      petBreed={item.breed}
                      petImg={
                        item.mediaUrls?.find((url) =>
                          url.match(/\.(jpeg|jpg|png|gif|bmp|webp)$/i)
                        ) || "https://via.placeholder.com/300?text=No+Image"
                      }
                      description={item.description}
                      likes={item.likes}
                      onClick={() => console.log("Adopted pet clicked:", item)}
                    />
                  </div>
                );
              case "lost":
                return (
                  <div key={item.id} style={{ marginBottom: "1rem" }}>
                    <FindCard
                      id={item.id}
                      petName={item.petName}
                      breed={item.breed}
                      mediaUrls={item.mediaUrls}
                      description={item.description}
                      lastSeen={item.lastSeen}
                      lostStatus={item.lostStatus}
                      onClick={() => openModal(item)}
                    />
                  </div>
                );
              case "comment":
                return (
                  <div key={item.commentId} style={{ marginBottom: "1rem" }}>
                    <CommentCard
                      author={item.author}
                      authorImg={item.authorImg}
                      text={item.text}
                      createdAt={item.createdAt} // Keep original prop passing
                      likedBy={item.likedBy}
                      likes={item.likes}
                      userId={item.userId}
                    />
                  </div>
                );
              default:
                return null;
            }
          })
        )}
      </Masonry>

      {/* Lost Pet Modal */}
      <FindModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pet={selectedPet}
      />
    </div>
  );
};

export default OverviewCombined;
