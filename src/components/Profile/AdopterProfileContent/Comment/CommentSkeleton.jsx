import React from "react";

const CommentSkeleton = () => {
  return (
    <div className="animate-pulse flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Skeleton avatar */}
      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      <div className="flex-1 space-y-2">
        {/* Skeleton for the header */}
        <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
        {/* Skeleton for the comment text */}
        <div className="h-3 bg-gray-300 w-full rounded"></div>
        <div className="h-3 bg-gray-300 w-5/6 rounded"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
