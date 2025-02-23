import React from "react";
import PropTypes from "prop-types";

const tagStyles = {
  "List a Pet": {
    bg: "bg-blue-100",
    border: "border-blue-500",
    textColor: "text-blue-500",
    text: "#ADOPT",
  },
  Event: {
    bg: "bg-purple-100",
    border: "border-purple-500",
    textColor: "text-purple-500",
    text: "#SUPPORT",
  },
  Story: {
    bg: "bg-pink-100",
    border: "border-pink-500",
    textColor: "text-pink-500",
    text: "#SHARE",
  },
  "Lost Pet": {
    bg: "bg-rose-100",
    border: "border-rose-500",
    textColor: "text-rose-500",
    text: "#Lost",
  },
};

const Tag = ({ type }) => {
  const style = tagStyles[type] || tagStyles["List a Pet"]; // Default to "List a Pet"

  return (
    <span
      className={`inline-block px-4 py-1 mb-2 border rounded-full text-xs font-semibold ${style.bg} ${style.border} ${style.textColor}`}
    >
      {style.text}
    </span>
  );
};

Tag.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tag;
