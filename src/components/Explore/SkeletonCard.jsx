import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative group rounded-lg overflow-hidden h-64 w-full bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center"></div>
    </div>
  );
};

export default SkeletonCard;
