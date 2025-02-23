import React from "react";

const AdoptPetButton = ({ onClick }) => {
  return (
    <button
      className="rounded-full border text-xs text-primary border-primary bg-tagBg py-1 px-4 
      font-arpona font-light transition-transform hover:-translate-y-1 duration-300"
      onClick={onClick} // ✅ Calls `openAdoptModal(post)` from `FeedItem`
    >
      Adopt this Pet
    </button>
  );
};

export default AdoptPetButton;
