import React, { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Extracts userId from URL
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Export from "../../../../assets/icons/export.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import InlineImage from "../../../Media/InlineImage";
import InlineVideo from "../../../Media/InlineVideo";
import FeedTag from "../../../Feed/FeedCard/FeedTag/FeedTag";
import useAdoptionRequest from "../../../../hooks/useAdoptionRequest";

const AdoptableModal = ({ isOpen, onClose, adoptable, tags }) => {
  const { userId } = useParams(); // ✅ Extract userId from URL
  const { requestAdoption, loading } = useAdoptionRequest(); // ✅ Use adoption request hook

  // 🏠 Mock shelter data (Replace with actual shelter data if available)
  const shelter = {
    name: "Paw Haven Animal Shelter",
    location: "123 Pet Street, Furry City, PA 45678",
    contact: "+1 234-567-890",
    email: "contact@pawhaven.org",
  };

  // ✅ Handle Adoption Request
  const handleAdoptionRequest = async () => {
    await requestAdoption(adoptable.id, adoptable.userId);
  };

  // ✅ Media Handling (Fallback for missing media)
  const mediaUrls =
    adoptable.mediaUrls?.length > 0
      ? adoptable.mediaUrls
      : ["https://via.placeholder.com/600?text=No+Image"];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex justify-center items-center"
        onClose={onClose}
      >
        {/* Background Overlay */}
        <TransitionChild
          enter="transition-opacity duration-300 delay-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </TransitionChild>

        {/* Modal Box */}
        <TransitionChild
          enter="transition-transform duration-300"
          enterFrom="scale-90 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-transform duration-200"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-90 opacity-0"
        >
          <div className="bg-white px-6 pb-4 rounded-2xl w-full max-w-5xl max-h-full overflow-y-auto relative grid grid-cols-5 gap-4 z-50">
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 text-2xl"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-600" />
            </button>

            {/* Left: Media Viewer */}
            <div className="col-span-3 flex flex-col">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-72 rounded-xl mb-4 mt-8"
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

              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-800 text-sm font-semibold">
                  {adoptable.petBreed}
                </p>
              </div>
              <p className="text-gray-600 text-xs mb-4 whitespace-pre-line">
                {adoptable.description}
              </p>
            </div>

            {/* Right: Shelter Info */}
            <div className="col-span-2 border-l pl-4 flex flex-col justify-between mt-10">
              <div>
                <div className="bg-hoverColor px-4 py-8 rounded-xl">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-sm mb-2">
                      Shelter's Basic Information
                    </h3>
                    <button className="w-5 h-5">
                      <img src={Export} alt="" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-800 font-medium">Shelter Name:</p>
                      <p className="text-gray-600">{shelter.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Location:</p>
                      <p className="text-gray-600">{shelter.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Contact:</p>
                      <p className="text-gray-600">{shelter.contact}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Email:</p>
                      <p className="text-gray-600">{shelter.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🏷️ Tags Section */}
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

              {/* 📄 Download Full Form */}
              <div className="flex flex-col gap-1 mt-4 mb-4">
                <h3 className="text-sm font-semibold mb-2">
                  Download Adopter's Full Form
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-600 text-xs bg-gray-200 p-2 rounded-lg">
                    {"Maro Org"}_full_form.pdf
                  </div>
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 border-2 text-sm border-primary text-center justify-center rounded-xl flex items-center gap-1"
                >
                  Download Now
                </a>
              </div>

              {/* 🏡 Adoption Request Button */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleAdoptionRequest}
                  className="py-2 px-6 bg-altTagColor text-white rounded-full transition hover:-translate-y-2 duration-300"
                >
                  Take Me Home
                </button>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default AdoptableModal;
