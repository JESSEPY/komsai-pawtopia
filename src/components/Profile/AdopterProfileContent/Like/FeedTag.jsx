import React from "react";

const FeedTag = ({ tag }) => {
  return (
    <span className="px-4 py-1 bg-altTagColor text-white rounded-full text-xs">
      {tag}
    </span>
  );
};

export default FeedTag;
