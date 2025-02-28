import React, { useState } from "react";
import FindCard from "./FindCard";
import FindModal from "./FindModal";
import FindCardSkeleton from "../../../Find/FindCardSkeleton";
import useUserLostPetPosts from "../../../../hooks/useUserLostPetPosts";

const Lost = () => {
  const { lostPets, isLoading, isError } = useUserLostPetPosts();
  console.log("User's LostPets:", lostPets);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  return (
    <div className="relative container p-4">
      <div className="mt-8">
        {isError ? (
          <p className="text-red-500">Error fetching lost pet posts.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4">
            {isLoading ? (
              // Show 6 skeleton cards while loading
              [...Array(6)].map((_, index) => <FindCardSkeleton key={index} />)
            ) : lostPets.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No lost pet posts found.
              </p>
            ) : (
              lostPets.map((pet) => (
                <FindCard
                  key={pet.id}
                  {...pet}
                  onClick={() => openModal(pet)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Render the modal */}
      <FindModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pet={selectedPet}
      />
    </div>
  );
};

export default Lost;
