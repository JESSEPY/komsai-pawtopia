import React from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"; // Outline version
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"; // Solid version

// The component now uses a "liked" prop directly instead of internal state.
const Like = ({ liked, onToggle }) => {
  return (
    <button
      onClick={() => onToggle && onToggle(!liked)}
      aria-label={liked ? "Unlike" : "Like"}
      className="like-button flex items-center justify-center"
    >
      {liked ? (
        <SolidHeartIcon className="h-7 w-7 text-primary" /> // Active icon
      ) : (
        <OutlineHeartIcon className="h-7 w-7 text-black transition-colors hover:text-primary duration-300" /> // Inactive icon
      )}
    </button>
  );
};

export default Like;
