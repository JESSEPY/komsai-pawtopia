// FeedCaption.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Verified from "../../../../assets/icons/verifiedPaw.svg";

const FeedCaption = ({ username, isVerified, caption }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 200;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const renderCaption = () => {
    if (caption.length <= MAX_LENGTH) {
      return (
        <span className="whitespace-pre-wrap break-words break-all">
          {caption}
        </span>
      ); // ✅ Preserves spaces & line breaks
    }

    return isExpanded ? (
      <span className="whitespace-pre-wrap">
        {caption}{" "}
        <button
          onClick={toggleExpanded}
          className="text-sm text-gray-800 focus:outline-none"
        >
          less
        </button>
      </span>
    ) : (
      <span className="whitespace-pre-wrap">
        {caption.slice(0, MAX_LENGTH).trim()}...
        <button
          onClick={toggleExpanded}
          className="text-sm text-gray-800 focus:outline-none"
        >
          more
        </button>
      </span>
    );
  };

  return (
    <div className="w-full h-auto text-sm text-black font-thin">
      <p className="text-black text-sm font-light">
        <NavLink to="/profile" className="text-black font-semibold">
          {username}
        </NavLink>
        {isVerified && (
          <img
            src={Verified}
            alt="Verified"
            className="inline-block w-4 h-4 ml-1"
          />
        )}{" "}
        {renderCaption()}
      </p>
    </div>
  );
};

export default FeedCaption;
