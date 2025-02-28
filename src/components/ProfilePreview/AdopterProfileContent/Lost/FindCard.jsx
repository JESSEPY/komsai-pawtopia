import React from "react";

const statusColors = {
  lost: "bg-rose-700",
  found: "bg-blue-600",
  resolved: "bg-green-500",
};

const FindCard = ({
  title,
  petName,
  age,
  breed,
  description,
  reward,
  mediaUrls,
  lostStatus,
  onClick, // Click handler for opening modal
}) => {
  const maxLength = 200; // Max characters before truncation

  // Determine which color class to use (defaults to rose if none found)
  const badgeColor = statusColors[lostStatus] || "bg-rose-700";

  return (
    <div
      className="flex flex-col bg-white border-2 border-adoptableCardBorder rounded-[1.4rem] p-4 max-w-3xl cursor-pointer"
      onClick={onClick} // Open modal on click
    >
      {/* Image */}
      {mediaUrls && mediaUrls.length > 0 && (
        <img
          src={mediaUrls[0]} // Display the first image
          alt={petName}
          className="w-full h-48 object-cover rounded-t-[1.5rem] mb-4"
        />
      )}

      {/* Content */}
      <div className="flex flex-col space-y-2">
        {/* Pet Name and Lost Status */}
        <div className="flex justify-between items-center">
          <h3 className="font-sans text-md text-gray-800">{petName}</h3>
          <span
            className={`text-xs rounded-full text-white py-1 px-8 flex items-center ${badgeColor}`}
          >
            {lostStatus}
          </span>
        </div>

        {/* Age and Breed */}
        <p className="text-sm italic text-gray-600">
          <span className="font-sans">Age:</span> {age} || {breed}
        </p>

        {/* Trimmed Description */}
        <p className="text-sm text-gray-800 mb-2 break-words break-all">
          {description.length > maxLength
            ? description.substring(0, maxLength) + "..."
            : description}
        </p>

        {/* Reward Section (Only if reward exists) */}
        {reward && (
          <p className="text-sm font-bold text-gray-800 mt-2">
            Reward: ${reward} for safe return
          </p>
        )}
      </div>
    </div>
  );
};

export default FindCard;
