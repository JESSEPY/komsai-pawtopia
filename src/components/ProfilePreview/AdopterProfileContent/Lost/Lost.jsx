import React from "react";
import { useParams } from "react-router-dom"; // Extracts userId from the URL
import FindCard from "./FindCard";
import FindCardSkeleton from "../../../Find/FindCardSkeleton";
import { useUserLostPetPostsById } from "../../../../hooks/useUserLostPetPosts"; // Import ID-based hook

const LostPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from the route
  const { lostPets, isLoading, isError } = useUserLostPetPostsById(userId); // ✅ Fetch lost pets by userId
  console.log(`Lost pets for user ${userId}:`, lostPets);

  return (
    <div className="relative container p-4">
      <div className="mt-8">
        {isError ? (
          <p className="text-red-500">Error fetching lost pet posts.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
            {isLoading ? (
              [...Array(6)].map((_, index) => <FindCardSkeleton key={index} />)
            ) : lostPets.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No lost pet posts found for this user.
              </p>
            ) : (
              lostPets.map((pet) => <FindCard key={pet.id} {...pet} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPreview;
