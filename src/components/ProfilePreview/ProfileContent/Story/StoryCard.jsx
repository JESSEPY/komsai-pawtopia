import React, { useState } from "react";
import StoryModal from "./StoryModal"; // Import the modal component

const StoryCard = ({ story }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { username, title, description, createdAt, mediaUrls = [] } = story;

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  // Find the first image in mediaUrls (fallback to default)
  const coverImage =
    mediaUrls.find((url) => !isVideo(url)) || "/default-story-image.jpg";

  return (
    <>
      {/* Story Card */}
      <div
        className="flex flex-col md:flex-row border-b pb-2 md:mx-0 mx-4 cursor-pointer  hover:bg-gray-100 transition duration-300"
        onClick={openModal}
      >
        {/* Image on the top for mobile, left for larger screens */}
        <img
          src={coverImage}
          alt={title}
          className="w-full md:w-64 h-64 object-cover rounded-lg"
        />

        {/* Content below image for mobile, right for larger screens */}
        <div className="flex flex-col pt-4 md:px-4 w-full md:w-2/3">
          <h2 className="font-sans font-semibold text-lg">{title}</h2>
          <p className="text-gray-700 text-sm mb-2">
            {description.length > 500
              ? `${description.substring(0, 500)}...`
              : description}
          </p>
          <div className="flex-grow"></div>
          <div className="flex-col items-center justify-center">
            <p className="text-sm text-gray-500 text-right">
              {createdAt || "No date"}
            </p>
            <p className="font-sans text-sm font-medium text-right">
              {username}
            </p>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      <StoryModal isOpen={isOpen} onClose={closeModal} story={story} />
    </>
  );
};

export default StoryCard;
