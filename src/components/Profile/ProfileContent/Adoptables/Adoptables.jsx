import React, { useState, useEffect } from "react";
import AdoptableCard from "./AdoptableCard";
import AdoptableModal from "./AdoptableModal";
import { useAdoptablePosts } from "../../../../hooks/useAdoptablePosts"; // Fetch posts from Firestore
import SkeletonLoader from "./SkeletonLoader"; // Import Skeleton Loader
import { useEventPosts } from "../../../../hooks/useEventPosts";

const Adoptables = () => {
  const [selectedAdoptable, setSelectedAdoptable] = useState(null);
  const { adoptablePosts, isLoading, error } = useAdoptablePosts();
  const [showContent, setShowContent] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  const { eventPosts, userProfile } = useEventPosts();

  console.log(eventPosts);

  // Smooth transition delay for content
  useEffect(() => {
    if (!isLoading) {
      setShowContent(true);
      setTimeout(() => setHideSkeleton(true), 500); // Ensures skeleton fades out AFTER content fades in
    } else {
      setShowContent(false);
      setHideSkeleton(false);
    }
  }, [isLoading]);

  const openModal = (adoptable) => {
    setSelectedAdoptable(adoptable);
  };

  const closeModal = () => {
    setSelectedAdoptable(null);
  };

  if (error) {
    return (
      <p className="text-red-500">
        Error fetching adoptable posts: {error.message}
      </p>
    );
  }

  return (
    <>
      <div className="max-w-4xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Skeleton Loader - Now fades out smoothly instead of disappearing */}
          {isLoading &&
            !hideSkeleton &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  showContent ? "opacity-0" : "opacity-100"
                }`}
              >
                <SkeletonLoader />
              </div>
            ))}

          {/* Adoptable Cards with smooth fade-in */}
          {!isLoading &&
            adoptablePosts.map((pet) => {
              const petImg =
                pet.mediaUrls?.find((url) =>
                  url.match(/\.(jpeg|jpg|png|gif|bmp|webp)$/i)
                ) || "https://via.placeholder.com/300?text=No+Image";

              return (
                <div key={pet.id}>
                  <AdoptableCard
                    petName={pet.petName}
                    petBreed={pet.breed}
                    petImg={petImg}
                    description={pet.description}
                    likes={pet.likes}
                    onClick={() => openModal(pet)}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {selectedAdoptable && (
        <AdoptableModal
          isOpen={!!selectedAdoptable}
          onClose={closeModal}
          adoptable={selectedAdoptable}
        />
      )}
    </>
  );
};

export default Adoptables;
