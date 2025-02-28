import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImportantTags from "./ImportantTags";
import InlineImage from "../Media/InlineImage";
import InlineVideo from "../Media/InlineVideo";

// Utility function to check if a URL is a video
const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const FindModal = ({ isOpen, onClose, pet }) => {
  if (!pet || !pet.user) return null;

  const { user } = pet;
  const { adoptionData = {} } = user;
  const { personal = {}, questionnaire = {} } = adoptionData;

  const mediaUrls =
    pet.mediaUrls && pet.mediaUrls.length > 0
      ? pet.mediaUrls
      : ["https://via.placeholder.com/600?text=No+Image"];

  // Format birthdate if available
  const formattedBirthDate = personal.birthDate
    ? new Date(personal.birthDate).toLocaleDateString()
    : "N/A";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex justify-center items-center p-4"
        onClose={onClose}
      >
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
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
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="bg-white px-6 pb-4 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col z-50">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-4 text-2xl"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-600" />
            </button>

            {/* Two-Side Layout (Left: Media | Right: Details) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Left Side: Media Viewer */}
              <div className="flex items-center h-full">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full h-full rounded-xl"
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

              {/* Right Side: Pet & Owner Information */}
              <div className="flex flex-col justify-between h-full">
                {/* Post Type Badge */}
                <span className="bg-rose-700 text-white text-xs font-semibold px-3 py-1 rounded-full self-start">
                  {pet.postType}
                </span>

                {/* Pet Name, Breed, and Age in the Same Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-gray-800 text-lg font-semibold">
                    {pet.petName} - {pet.breed}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    | Age: {pet.age} years
                  </p>
                </div>

                {/* Important Tags */}
                {pet.tags && pet.tags.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">
                      Important Tags
                    </h3>
                    <ImportantTags tags={pet.tags} />
                  </div>
                )}

                {/* ✅ Scrollable Description Section (Preserved) */}
                <div className="text-gray-600 text-sm whitespace-pre-line overflow-y-auto max-h-[200px] px-2">
                  {pet.description || "No description available."}
                </div>

                {/* Reward Section */}
                {pet.reward && (
                  <p className="text-sm font-bold text-green-700 mt-2">
                    Reward: ${pet.reward} for safe return
                  </p>
                )}

                {/* Owner's Information */}
                <div className="bg-hoverColor px-4 py-4 rounded-xl mt-4">
                  <h3 className="font-semibold text-sm mb-2">
                    Owner's Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p className="text-gray-900">
                      {personal.firstName || "N/A"} {personal.lastName || ""}
                    </p>
                    <p className="text-gray-900 text-end">
                      {personal.gender || "N/A"}
                    </p>
                    <p className="text-gray-900">{formattedBirthDate}</p>
                    <p className="text-gray-900 text-end">
                      {personal.contactNumber || "N/A"}
                    </p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FindModal;
