import React from "react";

const RoleButton = ({ role, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`h-8 w-auto px-10 border-2 rounded-xl font-arpona font-black text-xs text-center  transition duration-300  ease ${
        selected
          ? "border-primary text-primary bg-secondary"
          : " text-customBlue bg-gray-200 border-none "
      }`}
    >
      {role}
    </button>
  );
};

export default RoleButton;
