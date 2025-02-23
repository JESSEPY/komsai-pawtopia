import React from "react";
import DoubleTap from "./DoubleTap"; // adjust the path as needed

const InlineImage = ({ media, onDoubleTap }) => {
  return (
    <DoubleTap onDoubleTap={onDoubleTap} className="w-full h-full">
      <img
        src={media}
        alt="Slide"
        className="w-full h-full rounded object-cover"
        loading="lazy"
      />
    </DoubleTap>
  );
};

export default InlineImage;
