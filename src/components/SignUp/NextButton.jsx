import React from "react";
import { NavLink } from "react-router-dom";

const NextButton = ({ to, state, label = "Next" }) => {
  return (
    <NavLink
      to={to}
      state={state}
      className="transition transform hover:-translate-y-2 duration-300 font-arpona font-black text-white w-48 h-8 rounded-lg bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)] flex items-center justify-center"
    >
      {label}
    </NavLink>
  );
};

export default NextButton;
