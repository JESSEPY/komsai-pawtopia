// components/SkeletonLoader.js
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse w-4/5 flex flex-col rounded-lg bg-gray-300 p-4">
      <div className="h-32 bg-gray-400 rounded mb-4"></div>
      <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonLoader;
