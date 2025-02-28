import React, { useState } from "react";
import FindCard from "./FindCard";
import FindCardSkeleton from "./FindCardSkeleton"; // Import skeleton
import ProfileNav from "../SuggestedShelters/ProfileNav/ProfileNav";
import TopNav from "../../components/TopNav/TopNav";
import FindModal from "./FindModal";
import useLostPetPosts from "../../hooks/useLostPetPosts";

const Find = () => {
  const { lostPets, isLoading, isError } = useLostPetPosts();
  console.log("LostPets:", lostPets);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (pet, user) => {
    setSelectedPet(pet);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative container p-4">
        <TopNav />
        <div className="md:flex items-end justify-end sm:hidden hidden">
          <ProfileNav />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">
            {isLoading
              ? // Show 6 skeleton cards while loading
                [...Array(6)].map((_, index) => (
                  <FindCardSkeleton key={index} />
                ))
              : lostPets.map((pet, index) => (
                  <FindCard
                    key={index}
                    {...pet}
                    onClick={() => openModal(pet, pet.user)}
                  />
                ))}
          </div>
        </div>
      </div>

      {/* Render the modal */}
      <FindModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pet={selectedPet}
        user={selectedUser}
      />
    </>
  );
};

export default Find;
