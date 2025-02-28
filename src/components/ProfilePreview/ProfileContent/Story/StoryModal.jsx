import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import InlineImage from "../../../Feed/FeedCard/InlineImage"; // Adjust path if needed
import InlineVideo from "../../../Feed/FeedCard/InlineVideo"; // Adjust path if needed

const StoryModal = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  const {
    username,
    title,
    description,
    date,
    mediaUrls = [],
    tags = [],
  } = story;

  // Default media
  const defaultMedia = ["https://via.placeholder.com/600?text=No+Image"];
  const images = mediaUrls.length > 0 ? mediaUrls : defaultMedia;

  // Check if a media item is a video
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex justify-center items-center p-4"
        onClose={onClose}
      >
        {/* Background Overlay */}
        <Transition.Child
          enter="transition-opacity duration-300 delay-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </Transition.Child>

        {/* Modal Content */}
        <Transition.Child
          enter="transition-transform duration-300"
          enterFrom="scale-90 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-transform duration-200"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-90 opacity-0"
        >
          <div className="bg-white px-6 pb-6 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col z-50">
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 text-2xl"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-600" />
            </button>

            {/* Two-Side Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Left Side: Media Viewer */}
              <div className="w-full flex items-center justify-center">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full h-[500px] md:h-[550px] rounded-xl"
                >
                  {images.map((media, index) => (
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

              {/* Right Side: Story Details */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-500">{date}</p>

                {/* Tags Section */}
                {tags.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-1 bg-gray-300 text-black rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enlarged Description Section */}
                <div className="flex-grow overflow-y-auto mt-4">
                  <p className="text-gray-700 text-sm whitespace-pre-line px-2">
                    {description || "No description available."}
                  </p>
                </div>

                {/* Author */}
                <p className="font-sans text-sm font-medium text-right mt-4">
                  {username}
                </p>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default StoryModal;
