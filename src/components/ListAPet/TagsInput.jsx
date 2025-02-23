import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTags = inputValue
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag.startsWith("#") && tag.length > 1);
      setTags([...tags, ...newTags]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="tags" className="font-medium text-gray-700">
        Tags
      </label>
      <input
        id="tags"
        type="text"
        placeholder="#Vaccinated"
        className="p-2 border border-listInputBorder bg-sidebarBg rounded-xl"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center  gap-1 py-1 px-4 bg-hoverColor rounded-md"
          >
            <span>{tag}</span>
            <button onClick={() => handleRemoveTag(index)}>
              <XMarkIcon className="h-5 w-5 transition hover:text-red-600 duration-300" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
