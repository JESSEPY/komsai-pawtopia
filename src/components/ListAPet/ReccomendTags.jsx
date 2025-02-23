import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const RecommendTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-400/80 rounded-full text-white py-2 px-4 flex items-center"
        >
          <span>{tag}</span>
          <XMarkIcon className="h-4 w-4 ml-2 text-white" />
        </span>
      ))}
    </div>
  );
};

export default RecommendTags;
