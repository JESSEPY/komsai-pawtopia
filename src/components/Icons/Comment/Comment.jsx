import React from "react";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"; // Import the outline version of the comment icon

const Comment = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center"
      aria-label="Open comments"
    >
      <ChatBubbleOvalLeftIcon className="h-7 w-7 text-black transition-colors duration-300 hover:text-primary" />
    </div>
  );
};

export default Comment;
