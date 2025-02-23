import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DisplayTags = ({ tags = [], removeTag }) => {
  if (!tags || !Array.isArray(tags)) {
    return null; // Prevents errors if tags is undefined
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.length > 0 ? (
        tags.map((tag, index) => (
          <div
            key={index}
            className="bg-altTagColor text-white px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag}
            <button className="text-white" onClick={() => removeTag(index)}>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No tags added yet.</p>
      )}
    </div>
  );
};

export default DisplayTags;
