import React from "react";
import { NavLink } from "react-router-dom";

const DonateButton = () => {
  return (
    <>
      <NavLink
        to="/donate"
        className="w-44 text-xs h-auto text-gray-600   font-arpona  font-black flex items-center justify-center bg-donateColor rounded-lg p-2"
      >
        Donate Now
      </NavLink>
    </>
  );
};

export default DonateButton;
