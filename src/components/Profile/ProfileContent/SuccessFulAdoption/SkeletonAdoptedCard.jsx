import React from "react";

const SkeletonAdoptedCard = () => {
  return (
    <div className="flex flex-col md:flex-row mt-4 border-b pb-2 md:mx-0 mx-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full md:w-64 h-64 bg-gray-300 rounded-lg"></div>

      {/* Content Skeleton */}
      <div className="flex flex-col pt-4 md:px-4 w-full md:w-2/3">
        {/* Adopted Badge Skeleton */}
        <div className="w-24 h-6 bg-gray-300 rounded-full self-start mt-2 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>{" "}
        {/* Description */}
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>{" "}
        {/* Description */}
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>{" "}
        {/* Description */}
        <div className="flex-grow"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 self-end mt-4"></div>{" "}
        {/* Date */}
      </div>
    </div>
  );
};

export default SkeletonAdoptedCard;
