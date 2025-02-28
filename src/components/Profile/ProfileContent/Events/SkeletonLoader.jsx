import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col rounded-2xl max-w-xl h-full bg-gray-300 p-4">
      {/* Profile Section (Username & Profile Image) */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-400 rounded-full"></div>{" "}
        {/* Profile Image */}
        <div className="flex flex-col w-32">
          <div className="h-4 bg-gray-400 rounded w-24 mb-2"></div>{" "}
          {/* Username */}
          <div className="h-3 bg-gray-400 rounded w-16"></div>{" "}
          {/* Date Posted */}
        </div>
      </div>

      {/* Event Description Placeholder */}
      <div className="h-20 bg-gray-400 rounded mb-4"></div>

      {/* Event Image Placeholder */}
      <div className="w-full h-96 bg-gray-400 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
