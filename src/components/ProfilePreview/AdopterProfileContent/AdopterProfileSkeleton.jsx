import React from "react";

const AdopterProfileSkeleton = () => {
  return (
    <div className="w-full bg-slate-100 shadow-sm rounded-xl border p-6 animate-pulse">
      {/* Cover Image Placeholder */}
      <div className="w-full h-32 bg-gray-300 rounded-t-xl"></div>

      {/* Username & Title Placeholder (Attached to Cover Image) */}
      <div className="flex flex-col mt-2 px-6">
        {/* Username Placeholder (Directly Below Cover Image) */}
        <div className="h-5 w-32 bg-gray-300 rounded"></div>
        {/* Fur Title Placeholder */}
        <div className="h-4 w-20 bg-gray-200 rounded mt-1"></div>
      </div>

      {/* Stats Grid Placeholder */}
      <div className="grid grid-cols-2 gap-4 mt-6 px-6">
        <div>
          <div className="h-6 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-6 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-6 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-6 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Hobbies Section Placeholder */}
      <div className="mt-6 px-6">
        <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Logout Button Placeholder */}
      <div className="text-center  flex items-center justify-center mt-6">
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default AdopterProfileSkeleton;
