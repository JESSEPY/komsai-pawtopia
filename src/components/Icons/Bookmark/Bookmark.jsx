import React, { useState } from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline"; // Outline icons
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid"; // Solid icon for active state

const Bookmark = ({ initialBookmarked = false, onToggle }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleToggle = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
      className="bookmark-button flex items-center justify-center"
    >
      {bookmarked ? (
        <BookmarkSolidIcon className="h-7 w-7 text-primary" />
      ) : (
        <BookmarkIcon className="h-7 w-7 text-black transition-colors hover:text-primary duration-300" />
      )}
    </button>
  );
};

export default Bookmark;
