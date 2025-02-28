import React from "react";
import Donate from "../../assets/icons/donate.svg";
import DonateButton from "./DonateButton";

const Donation = () => {
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-4 px-4 py-6 bg-suggestedBg rounded-2xl items-center">
        <img src={Donate} alt="donate icon" className="w-12 h-12" />
        {/* Funds Raised must be dynamic later */}
        <p className="font-sans text-lg ">
          <span className="text-lg font-semibold">₱3456 </span>
          Total fund raised
        </p>
        <DonateButton />
        <p className="font-san font-bold text-xs">DONATE FOR A CAUSE</p>
        <p className="font-sans text-sm text-center">
          Your support can change lives—donate today to provide food, shelter,
          and medical care for stray and abandoned animals, helping them find a
          loving forever home.
        </p>
      </div>
    </>
  );
};

export default Donation;
