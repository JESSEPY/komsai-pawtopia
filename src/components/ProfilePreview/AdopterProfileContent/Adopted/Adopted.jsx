import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Extracts userId from the URL
import AdoptableCard from "./AdoptableCard";
import { useAdoptedPetsById } from "../../../../hooks/useAdoptedPets"; // Custom hook for fetching adopted pets by UID
import SkeletonLoader from "./AdoptedSkeletonLoader"; // Import Skeleton Loader

const AdoptedPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from the route
  const { data: petsData, error, isLoading } = useAdoptedPetsById(userId); // ✅ Pass userId to hook
  const [selectedAdoptable, setSelectedAdoptable] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  // ✅ Handle missing userId before fetching
  useEffect(() => {
    if (!userId) {
      console.error("Error: No adopter UID found in the URL.");
    }
  }, [userId]);

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

  if (!userId) {
    return (
      <p className="text-red-500">Error: No adopter UID found in the URL.</p>
    );
  }

  if (error) {
    return <p className="text-red-500">Error fetching adopted pets: {error}</p>;
  }

  console.log("Pets Data", petsData);

  return (
    <>
      <div className="max-w-4xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Skeleton Loader - Fades out smoothly */}
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

          {/* Adopted Pets Cards */}
          {!isLoading && petsData?.length > 0
            ? petsData.map((pet) => {
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
              })
            : !isLoading && (
                <p className="text-gray-600">
                  This user hasn't adopted any pets yet.
                </p>
              )}
        </div>
      </div>
    </>
  );
};

export default AdoptedPreview;
