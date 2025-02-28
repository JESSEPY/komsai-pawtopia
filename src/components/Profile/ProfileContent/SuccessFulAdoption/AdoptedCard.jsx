import React, { useState } from "react";
import AdoptedModal from "./AdoptableModal"; // New modal component

const AdoptedCard = ({
  petName,
  title,
  description,
  date,
  mediaUrls,
  adopterName,
  tags,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trim description for a cleaner layout
  const trimmedDescription =
    description.length > 500
      ? `${description.substring(0, 500)}...`
      : description;

  // Find the first image in mediaUrls (ignore videos)
  const imageUrl =
    mediaUrls.find((url) => url.match(/\.(jpeg|jpg|png|gif|webp)$/i)) ||
    mediaUrls[0];

  return (
    <>
      {/* Card Clickable to Open Modal */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col cursor-pointer mt-4 md:flex-row border-b pb-2 md:mx-0 mx-4 hover:bg-gray-100 transition duration-300 p-2 rounded-lg"
      >
        {/* Image on the left for larger screens, top for mobile */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={petName}
            className="w-full md:w-64 h-64 object-cover rounded-lg"
          />
        )}

        {/* Content section */}
        <div className="flex flex-col md:px-4 w-full md:w-2/3">
          {/* Adopted Badge */}
          <span className="bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full self-start">
            Adopted by {adopterName || "Unknown"}
          </span>

          <h2 className="font-sans font-semibold mt-2 text-lg">{title}</h2>
          <p className="text-gray-700 text-sm mb-2">{trimmedDescription}</p>

          {/* Tags Section
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-altTagColor text-white rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}

          <div className="flex-grow"></div>
          <div className="flex-col items-center justify-center">
            <p className="text-sm text-gray-500 text-right">{date}</p>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <AdoptedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          adoptedPost={{
            petName,
            title,
            description,
            date,
            mediaUrls,
            adopterName,
            tags,
          }}
        />
      )}
    </>
  );
};

export default AdoptedCard;
