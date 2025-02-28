import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Extract userId from URL
import AdoptableCard from "./AdoptableCard";
import AdoptableModal from "./AdoptableModal"; // ✅ Import updated modal
import { useAdoptablePostsById } from "../../../../hooks/useAdoptablePosts"; // ✅ Use ID-based hook for preview mode
import SkeletonLoader from "./SkeletonLoader"; // ✅ Import Skeleton Loader
import { useEventPosts } from "../../../../hooks/useEventPosts";

const AdoptablesPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from URL (profile preview)
  const [selectedAdoptable, setSelectedAdoptable] = useState(null);

  // ✅ Fetch adoptable posts for the specific user in preview mode
  const { adoptablePosts, isLoading, error } = useAdoptablePostsById(userId);

  const [showContent, setShowContent] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  const { eventPosts } = useEventPosts();

  console.log("Event Posts:", eventPosts);
  console.log("Adoptable Posts (Preview):", adoptablePosts);

  // ✅ Scroll to top when the component is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Smooth transition delay for content loading
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
          {/* ✅ Skeleton Loader - Now fades out smoothly instead of disappearing */}
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

          {/* ✅ Adoptable Cards with smooth fade-in */}
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

      {/* ✅ Adoptable Modal (Opens when a pet is clicked) */}
      {selectedAdoptable && (
        <AdoptableModal
          isOpen={!!selectedAdoptable}
          onClose={closeModal}
          adoptable={selectedAdoptable}
          tags={selectedAdoptable.tags || []} // ✅ Pass tags from adoptable data
        />
      )}
    </>
  );
};

export default AdoptablesPreview;
