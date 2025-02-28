import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full py-4 px-4 border-2 border-adoptableCardBorder rounded-[1.4rem] overflow-hidden animate-pulse duration-300 bg-white">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-300 rounded-t-[1.7rem]" />

      {/* Pet Name and Breed */}
      <div className="">
        <div className="flex gap-2 items-center mb-2 pt-2">
          <div className="h-5 bg-gray-300 rounded w-1/3" />
          <div className="h-4 bg-gray-300 rounded w-1/4 px-4 py-1" />
        </div>

        {/* Description Placeholder */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2" />
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-2" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
