import React from "react";

const FindCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white border-2 border-adoptableCardBorder rounded-[1.4rem] p-4 max-w-3xl animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 rounded-t-[1.5rem] mb-4"></div>

      {/* Content Skeleton */}
      <div className="flex flex-col space-y-2">
        {/* Pet Name and Adoption Status */}
        <div className="flex justify-between items-center">
          <div className="w-24 h-5 bg-gray-300 rounded"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Age and Breed */}
        <div className="w-36 h-4 bg-gray-300 rounded"></div>

        {/* Description Skeleton */}
        <div className="w-full h-10 bg-gray-300 rounded"></div>

        {/* Reward Skeleton */}
        <div className="w-40 h-5 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default FindCardSkeleton;
