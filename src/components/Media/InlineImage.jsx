import React from "react";

const InlineImage = ({ media, className = "" }) => {
  return (
    <div className="w-full h-[600px] flex justify-center items-center overflow-hidden">
      {/* Main Image (Fits the container) */}
      <img
        src={media}
        alt="Slide"
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default InlineImage;
