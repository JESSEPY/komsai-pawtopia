import React from "react";
import { NavLink } from "react-router-dom";

const AdoptableCard = ({
  petName,
  petBreed,
  petImg,
  description,
  likes,
  onClick,
}) => {
  const placeholderId = "placeholder-id";

  // Trim description to 200 characters for better readability
  const trimmedDescription =
    description.length > 200
      ? `${description.substring(0, 200)}...`
      : description;

  return (
    <NavLink
      to={`/adoptable/${placeholderId}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="px-4 py-4 h-[400px] bg-white border-2 border-adoptableCardBorder rounded-[1.4rem] md:mx-0 mx-4">
        {/* Image */}
        <img
          src={petImg}
          alt={petName}
          className="aspect-square h-56 w-full object-cover rounded-t-[1.7rem]"
          loading="lazy"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300?text=Image+Unavailable")
          }
        />

        {/* Pet Name, Breed & Adopted Badge */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-sans font-medium">{petName}</h3>
            <p className="text-sm font-sans bg-hoverColor rounded-lg px-4 py-1">
              {petBreed}
            </p>
          </div>

          {/* Adopted Badge */}
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Adopted
          </span>
        </div>

        {/* Trimmed Description */}
        <p className="text-gray-600 mt-1 text-sm">{trimmedDescription}</p>
      </div>
    </NavLink>
  );
};

export default AdoptableCard;
