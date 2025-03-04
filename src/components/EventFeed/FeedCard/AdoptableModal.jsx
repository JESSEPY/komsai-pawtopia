import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ExportIcon from "../../../assets/icons/export.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InlineImage from "./InlineImage";
import InlineVideo from "./InlineVideo";
import FeedTag from "./FeedTag/FeedTag";
import useAdoptionRequest from "../../../hooks/useAdoptionRequest";
import { useUserProfile } from "../../../hooks/userProfile";
import FullShelterModal from "./FullShelterModal";

const AdoptableModal = ({ isOpen, onClose, adoptable, tags = [] }) => {
  const { requestAdoption, loading } = useAdoptionRequest();
  const { userProfile } = useUserProfile();

  // State to control the full shelter modal
  const [isFullShelterModalOpen, setFullShelterModalOpen] = useState(false);

  // Check if the user is a Shelter
  const isShelter = userProfile?.role === "Shelter";

  // Handle Adoption Request
  const handleAdoptionRequest = async () => {
    await requestAdoption(adoptable.id, adoptable.userId);
  };

  // Ensure adoptable data is valid
  if (!adoptable) return null;

  // Default media handling
  const mediaUrls =
    adoptable.mediaUrls?.length > 0
      ? adoptable.mediaUrls
      : ["https://via.placeholder.com/600?text=No+Image"];

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  // Extract Shelter Data
  const shelterData = adoptable.shelterData || {};
  const personal = shelterData.personal || {};

  return (
    <>
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
            <div className="bg-white px-6 pb-4 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col z-50">
              {/* Close Button */}
              <button
                className="absolute top-2 right-4 text-2xl"
                onClick={onClose}
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

                {/* Right Side: Pet & Shelter Details */}
                <div className="flex flex-col justify-between h-full">
                  {/* Adopted Badge */}
                  <span className="bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full self-start">
                    Looking for a Home
                  </span>

                  <h2 className="text-lg font-bold mt-2">{adoptable.title}</h2>
                  <p className="text-sm text-gray-500">{adoptable.date}</p>

                  {/* ✅ Scrollable Description Section (Preserved) */}
                  <div className="text-gray-600 text-sm whitespace-pre-line overflow-y-auto max-h-[250px] px-2">
                    {adoptable.description || "No description available."}
                  </div>

                  {/* Tags Section */}
                  {tags.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <FeedTag key={index} tag={tag} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shelter Info (Retains Original Colors) */}
                  <div className="bg-hoverColor px-4 py-4 rounded-xl mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-sm">
                        Shelter Information
                      </h3>
                      <button onClick={() => setFullShelterModalOpen(true)}>
                        <img
                          src={ExportIcon}
                          alt="View Full Shelter Profile"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-800 font-medium">
                          Shelter Name:
                        </p>
                        <p className="text-gray-600">
                          {personal.shelterName || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Type:</p>
                        <p className="text-gray-600">
                          {personal.shelterType || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Location:</p>
                        <p className="text-gray-600">
                          {personal.address || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Contact:</p>
                        <p className="text-gray-600">
                          {personal.contactNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Action Buttons - Only show if not a Shelter */}
                  {!isShelter && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={handleAdoptionRequest}
                        className="py-2 px-6 bg-altTagColor text-white rounded-full transition hover:-translate-y-2 duration-300"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Take Me Home"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Full Shelter Modal */}
      <FullShelterModal
        isOpen={isFullShelterModalOpen}
        onClose={() => setFullShelterModalOpen(false)}
        selectedShelter={shelterData}
      />
    </>
  );
};

export default AdoptableModal;
