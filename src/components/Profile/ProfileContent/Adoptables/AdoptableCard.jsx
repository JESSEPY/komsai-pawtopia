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

  // Trim description to 400 characters and add "..." if it exceeds the limit
  const trimmedDescription =
    description.length > 400
      ? `${description.substring(0, 400)}...`
      : description;

  return (
    <NavLink
      to={`/adoptable/${placeholderId}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="px-4 py-4 h-[500px] bg-white border-2 border-adoptableCardBorder rounded-[1.4rem] md:mx-0 mx-4">
        <img
          src={petImg}
          alt={petName}
          className="aspect-square h-64 w-full object-cover rounded-t-[1.7rem]"
          loading="lazy"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300?text=Image+Unavailable")
          }
        />
        <div className="flex gap-2 items-center mt-4">
          <h3 className="text-lg font-sans font-medium">{petName}</h3>
          <p className="text-sm font-sans bg-hoverColor rounded-lg px-4 py-1">
            {petBreed}
          </p>
        </div>
        <p className="text-gray-600 mt-1 text-sm">{trimmedDescription}</p>
      </div>
    </NavLink>
  );
};

export default AdoptableCard;
