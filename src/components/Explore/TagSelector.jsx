// src/components/Explore/TagSelector.jsx
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import tagSelectorIcon from "../../assets/icons/tagSelector.svg";

const TagSelector = ({ availableTags, selectedTags, onChange }) => {
  const [showMaxMessage, setShowMaxMessage] = useState(false);
  const maxTags = 5;

  const handleTagClick = (tag) => {
    let updatedTags;
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag); // Remove tag
    } else if (selectedTags.length < maxTags) {
      updatedTags = [...selectedTags, tag]; // Add tag only if less than maxTags
    } else {
      // Show notification for max tags reached
      setShowMaxMessage(true);
      setTimeout(() => setShowMaxMessage(false), 2000);
      return;
    }
    onChange(updatedTags); // Notify parent component (Explore.jsx)
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Headless UI Menu for Dropdown */}
        <Menu as="div" className="relative">
          <div>
            <MenuButton className="px-3 py-1 flex justify-center items-center rounded-lg bg-white border-2 border-altTagColor w-12 h-8">
              <img
                src={tagSelectorIcon}
                alt="Tag Selector"
                className="w-4 h-4"
              />
            </MenuButton>
          </div>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems className="absolute mt-2 p-2 w-96 bg-white border rounded-lg shadow-lg z-10 flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <MenuItem key={tag}>
                  {({ active }) => (
                    <span
                      onClick={() => handleTagClick(tag)}
                      className={`font-arpona font-medium flex items-center justify-between text-sm px-3 py-1 rounded-lg h-8 cursor-pointer ${
                        selectedTags.includes(tag)
                          ? "bg-altTagColor text-white"
                          : `bg-white border-2 border-altTagColor ${
                              active ? "hover:bg-gray-200" : "hover:bg-gray-200"
                            }`
                      }`}
                    >
                      {tag}
                    </span>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>

        {/* Display Selected Tags */}
        <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="font-arpona font-medium flex items-center bg-white border-2 border-altTagColor text-sm px-3 py-1 rounded-lg h-8"
            >
              {tag}
              <button
                className="font-bold ml-2 hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
                onClick={() => handleTagClick(tag)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Maximum Tags Notification */}
      <Transition
        show={showMaxMessage}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-red-600 text-sm font-medium">
          Maximum of {maxTags} tags can be selected.
        </div>
      </Transition>
    </div>
  );
};

export default TagSelector;
