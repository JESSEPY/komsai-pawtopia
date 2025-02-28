import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Verified from "../../../../assets/icons/verifiedPaw.svg";
import FeedTag from "../../../Feed/FeedCard/FeedTag/FeedTag";
import InlineImage from "../../../Media/InlineImage";
import InlineVideo from "../../../Media/InlineVideo";

const EventCard = ({
  event = {},
  username = "Unknown",
  profileImg = "/default-avatar.png",
  isVerified = false,
}) => {
  const {
    eventDescription = "",
    datePosted = "",
    mediaUrls = [],
    tags = [],
  } = event;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);

  const truncatedDescription =
    eventDescription.length > 300
      ? eventDescription.substring(0, 300) + "..."
      : eventDescription;

  const timeAgo = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate();
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
  };

  // Function to check if the media URL is a video
  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  return (
    <div className="flex flex-col rounded-2xl max-w-xl h-full md:mx-0 mx-4 bg-eventCardBg pt-4 px-4">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profileImg}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <p className="font-sans font-semibold text-sm">{username}</p>
            {isVerified && (
              <img
                src={Verified}
                alt="Verified"
                className="w-4 h-4 rotate-12"
              />
            )}
          </div>
          <p className="text-sm text-blue-950/70">{timeAgo(datePosted)}</p>
        </div>
      </div>

      {/* Tags Section */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <FeedTag key={index} tag={tag} />
          ))}
        </div>
      )}

      {/* Event Description */}
      <p className="text-gray-700 text-base mb-2 whitespace-pre-line">
        {isExpanded ? eventDescription : truncatedDescription}
        {eventDescription.length > 300 && (
          <button onClick={toggleDescription} className="text-gray-700 ml-2">
            {isExpanded ? "less" : "more"}
          </button>
        )}
      </p>

      {/* Event Media Swiper */}
      {mediaUrls.length > 0 && (
        <div className="mt-4 -mx-4">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="rounded-b-2xl"
          >
            {mediaUrls.map((media, index) => (
              <SwiperSlide key={index}>
                {isVideo(media) ? (
                  <InlineVideo media={media} />
                ) : (
                  <InlineImage media={media} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default EventCard;
