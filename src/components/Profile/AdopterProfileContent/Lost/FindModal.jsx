import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImportantTags from "../../../Find/ImportantTags";
import InlineImage from "../../../Media/InlineImage";
import InlineVideo from "../../../Media/InlineVideo";
import useLostPetStatus from "../../../../hooks/useLostPetStatus";

// Utility function to check if a URL is a video
const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

// Map each status to a background color (Tailwind classes)
const statusColors = {
  lost: "bg-rose-700",
  found: "bg-blue-600",
  resolved: "bg-green-500",
};

const FindModal = ({ isOpen, onClose, pet }) => {
  if (!pet || !pet.user) return null;

  const { user, tags } = pet;
  const { adoptionData = {} } = user;
  const { personal = {} } = adoptionData;

  // Hook for updating Firestore lostStatus
  const { changeLostStatus, loading } = useLostPetStatus();

  // Local state for status selection
  const [selectedStatus, setSelectedStatus] = useState(
    pet.lostStatus || "lost"
  );

  // Reset selectedStatus when the modal opens or pet changes
  useEffect(() => {
    setSelectedStatus(pet.lostStatus || "lost");
  }, [pet]);

  // Update Firestore, but keep modal open
  const handleSave = async () => {
    await changeLostStatus(pet.id, selectedStatus);
    // The new status is already in `selectedStatus`, so the UI color & text will update instantly.
  };

  // Prepare media URLs
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
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Centering Element */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

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
            <div className="inline-block w-full max-w-5xl my-8 p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-4 text-2xl"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-600" />
              </button>

              <div className="grid grid-cols-5 gap-4">
                {/* Left: Media Viewer & Pet Details */}
                <div className="col-span-3 flex flex-col mt-4">
                  {/* Swiper Media Viewer */}
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full h-72 rounded-xl mb-4"
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

                  {/* Pet Info & Dynamic Status Color */}
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`${
                        statusColors[selectedStatus] || "bg-rose-700"
                      } rounded-full text-white py-1 px-8 flex items-center`}
                    >
                      {selectedStatus}
                    </span>
                  </div>

                  <h3 className="text-gray-800 text-lg font-semibold mb-2">
                    {pet.petName} - {pet.breed}
                  </h3>
                  <p className="text-gray-600 text-xs mb-4">
                    Age: {pet.age} years
                  </p>

                  {/* Description */}
                  <div className="max-h-36 overflow-y-auto pr-2">
                    <p className="text-gray-600 text-sm whitespace-pre-line break-words break-all">
                      {pet.description}
                    </p>
                  </div>

                  {/* Reward */}
                  {pet.reward && (
                    <p className="text-sm font-bold text-green-700 mt-2">
                      Reward: ${pet.reward} for safe return
                    </p>
                  )}
                </div>

                {/* Right: Owner Info & Status Selection */}
                <div className="col-span-2 border-l pl-4 flex flex-col justify-between mt-4">
                  {/* Owner's Basic Info */}
                  <div className="bg-hoverColor px-4 py-8 rounded-xl">
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm">
                        Owner's Basic Information
                      </h3>
                    </div>
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

                  {/* Tags Section */}
                  {tags.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-1 bg-altTagColor text-white rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status Selection */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Status</h3>
                    <p className="text-sm mb-4">Update the pet's lost status</p>
                    <div className="flex flex-col gap-2 mb-4">
                      {["lost", "found", "resolved"].map((option) => (
                        <label
                          key={option}
                          className="flex justify-between items-center"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                          <input
                            type="radio"
                            name="status"
                            value={option}
                            checked={selectedStatus === option}
                            onChange={() => setSelectedStatus(option)}
                            className="mr-2"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSave}
                      disabled={loading} // Prevent multiple clicks
                      className="py-2 px-6 bg-altTagColor text-white rounded-full transition hover:-translate-y-2 duration-300"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FindModal;
