import React from "react";

const NextButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="transition transform hover:-translate-y-2 duration-300 font-arpona font-black text-white w-48 h-8 rounded-lg bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)] flex items-center justify-center"
    >
      Next
    </button>
  );
};

export default NextButton;
