import React from "react";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

// Function to check if a URL is a video
const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const ExploreCard = ({
  mediaUrls = [],
  likeCount = 0,
  commentCount = 0,
  id,
}) => {
  // Ensure mediaUrls is an array
  const validMedia = Array.isArray(mediaUrls) ? mediaUrls : [];

  // Find the first image or video
  const firstImage = validMedia.find((url) => !isVideo(url));
  const firstVideo = validMedia.find((url) => isVideo(url));

  return (
    <div className="relative group rounded-lg overflow-hidden h-72 w-full cursor-pointer">
      {/* Display Image or Video */}
      {firstImage ? (
        <img
          src={firstImage}
          alt="Post"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      ) : firstVideo ? (
        <video
          className="w-full h-full object-cover rounded-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={firstVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <div className="flex items-center gap-2 md:gap-6 text-white text-lg font-semibold">
          {/* Likes */}
          <div className="flex items-center gap-1 md:gap-2">
            <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <span className="text-sm md:text-base">{likeCount}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-1 md:gap-2">
            <ChatBubbleOvalLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <span className="text-sm md:text-base">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
