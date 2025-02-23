import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TagEdit from "../../assets/icons/tag-edit.svg";
import RecommendTags from "./ReccomendTags";
import DisplayTags from "./DisplayTags";

const TagModal = ({ isOpen, onClose, setTags, selectedTags = [] }) => {
  // Initialize tags only when the modal opens
  const [tags, setLocalTags] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setLocalTags(selectedTags || []); // Prevents resetting while typing
    }
  }, [isOpen]);

  const [inputValue, setInputValue] = useState("");
  const [maxTagsReached, setMaxTagsReached] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && tags.length < 5) {
      setLocalTags((prevTags) => [...prevTags, inputValue.trim()]); // Ensures state updates correctly
      setInputValue("");
      setMaxTagsReached(tags.length + 1 >= 5);
    }
  };

  const removeTag = (index) => {
    setLocalTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setMaxTagsReached(false);
  };

  // Pass selected tags to the parent when the modal is closed
  const handleSaveTags = () => {
    setTags(tags); // Update parent's tags state
    onClose();
  };

  // Recommended Tags
  const recommendedTags = [
    "Cebu City",
    "Golden Retriever",
    "Affectionate",
    "Playful",
    "Trauma due to car crash",
  ];

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-[40%] p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          onClick={onClose}
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4">Add Tags</h2>
        <p className="text-gray-600 mb-4">
          Tags help highlight pet traits and preferences. Type yours below!
        </p>

        {/* Tag Input */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              id="tagInput"
              placeholder="Enter tags"
              className="w-full px-10 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              src={TagEdit}
              alt="Tag Icon"
              className="absolute inset-y-0 my-auto left-3 w-6 h-6"
            />
          </div>
        </div>

        {/* Display Added Tags */}
        <DisplayTags tags={tags} removeTag={removeTag} />

        {/* Recommended Tags */}
        <div className="flex-col gap-2 mb-10">
          <h2 className="text-xl font-semibold mb-4">Recommended Tags</h2>
          <RecommendTags tags={recommendedTags} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          {/* <button
            className="px-4 py-2 bg-gray-400 text-white rounded-full transition-transform hover:-translate-y-2 duration-300"
            onClick={onClose}
          >
            Cancel
          </button> */}
          <button
            className="py-2 px-6 bg-altTagColor text-white rounded-full transition-transform hover:-translate-y-2 duration-300"
            onClick={handleSaveTags}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default TagModal;
