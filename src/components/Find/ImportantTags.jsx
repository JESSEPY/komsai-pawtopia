import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImportantTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-altTagColor text-white rounded-full text-sm py-2 px-4 flex items-center"
        >
          <span>{tag}</span>
        </span>
      ))}
    </div>
  );
};

export default ImportantTags;
