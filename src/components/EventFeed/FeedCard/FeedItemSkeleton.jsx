// Example: src/components/Feed/FeedItemSkeleton.js
import React from "react";

const FeedItemSkeleton = () => (
  <div className="w-full h-auto mb-6 animate-pulse duration-300">
    {/* Header Skeleton */}
    <div className="flex items-center gap-x-2 mb-2">
      <div className="w-12 h-12 rounded-full bg-gray-300" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-3 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
    {/* Image Skeleton */}
    <div className="w-full max-w-[614px] mx-auto mb-2 h-96 bg-gray-300 rounded" />
    {/* Action Skeleton */}
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
    {/* Caption Skeleton */}
    <div className="h-3 bg-gray-300 rounded w-2/3 mb-2" />
  </div>
);

export default FeedItemSkeleton;
