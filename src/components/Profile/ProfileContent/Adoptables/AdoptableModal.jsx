import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AdoptersMockData from "./AdoptersMockData";
import Export from "../../../../assets/icons/export.svg";
import Like from "../../../Icons/Like/Like";
import Comment from "../../../Icons/Comment/Comment";
import Bookmark from "../../../Icons/Bookmark/Bookmark";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StatusTag from "./StatusTag";
import InlineImage from "../../../Media/InlineImage";
import InlineVideo from "../../../Media/InlineVideo";
import useAdoptionStatus from "../../../../hooks/useAdoptionStatus";
import useAdoptionRequests from "../../../../hooks/useAdoptionRequests";
import AdoptionRequestsRow from "./AdoptionRequestRow";
import AdopterDetails from "./AdopterDetails";
import EditAdoptableModal from "./EditAdoptableModal";
import { useNavigate } from "react-router-dom";

const AdoptableModal = ({ isOpen, onClose, adoptable }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("reviewing");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  console.log("SelectedRequest", selectedRequest);

  const { changeAdoptionStatus, loading } = useAdoptionStatus(); // ✅ Use Hook
  const adopter = AdoptersMockData[0];
  const testId = "hG093zDSl5cmxwzLX6G6";
  const {
    requests,
    loading: requestsLoading,
    error: requestsError,
  } = useAdoptionRequests(adoptable?.id);

  const [localRequests, setLocalRequests] = useState([]); // ✅ Rename to avoid conflict

  useEffect(() => {
    if (adoptable?.id && requests) {
      setLocalRequests(requests); // ✅ Only use actual Firestore requests
    }
  }, [adoptable, requests]); // ✅ Update when Firestore data changes

  console.log("Adoptable", adoptable);
  console.log("Requests", requests);
  console.log("Adoptable ID:", adoptable.id);

  console.log(adoptable);

  const handleStatusUpdate = async () => {
    if (!selectedRequest) return;

    try {
      await changeAdoptionStatus(
        adoptable.id,
        selectedRequest.id,
        status,
        selectedRequest.adopterId
      );

      // ✅ Update selected request locally
      setSelectedRequest((prev) => ({
        ...prev,
        status, // Update status locally
      }));

      // ✅ Update localRequests instead of conflicting with `requests`
      setLocalRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClose={onClose}
        >
          {/* Background Overlay (Fades in after modal appears) */}
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

          {/* Modal Box (Scales in smoothly) */}
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
                        <InlineVideo media={media} /> // ✅ Use InlineVideo for videos
                      ) : (
                        <InlineImage media={media} /> // ✅ Use InlineImage for images
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-800 text-sm font-semibold">
                    {adoptable.petName} || {adoptable.breed}
                  </p>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="py-1 px-4 bg-blue-500  text-sm text-white rounded-full transition hover:-translate-y-2 duration-300"
                  >
                    Edit Post
                  </button>
                </div>
                <p className="text-gray-600 text-xs mb-4 whitespace-pre-line">
                  {adoptable.description}
                </p>

                <div className="flex-grow"></div>

                {/* Like, Comment, Share */}
                {/* <div className="w-full h-auto justify-end mt-4">
                <div className="flex items-center gap-x-3">
                  <Like />
                  <Comment />
                  <Bookmark initialBookmarked={false} />
                </div>
              </div> */}

                {/* Like Count */}
                {/* <div className="w-full h-auto mt-1">
                <p className="text-black text-sm font-semibold">
                  {adoptable.likeCount}{" "}
                  <span className="text-sm font-arpona font-light">likes</span>
                </p>
              </div> */}
              </div>

              {/* Right: Adopter Info */}
              <div className="col-span-2 border-l pl-4 flex flex-col justify-between mt-10">
                <div>
                  {/* Adoption Requests Lazy Row */}
                  <AdoptionRequestsRow
                    requests={localRequests}
                    selectedRequest={selectedRequest}
                    setSelectedRequest={setSelectedRequest}
                    loading={requestsLoading}
                  />

                  <div className="flex my-4 w-full ">
                    <AdopterDetails
                      selectedRequest={selectedRequest}
                      formatDate={formatDate}
                    />
                  </div>

                  <StatusTag
                    postId={adoptable.id}
                    requestId={selectedRequest?.id}
                  />

                  {/* Status Selection */}
                  <h3 className="text-lg font-semibold mt-4">Status</h3>
                  <p className="text-sm mb-4">Choose the adoption status</p>
                  <div className="flex flex-col gap-2 mb-4">
                    {["reviewing", "approved", "declined"].map((option) => (
                      <label
                        key={option}
                        className="flex justify-between items-center"
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                        <input
                          type="radio"
                          name="status"
                          value={option}
                          checked={status === option}
                          onChange={() => setStatus(option)}
                          className="mr-2"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleStatusUpdate}
                    className="py-2 px-6 bg-altTagColor text-white rounded-full transition hover:-translate-y-2 duration-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      {/* Separated Edit Modal Component */}
      <EditAdoptableModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        adoptable={adoptable}
      />
    </>
  );
};

export default AdoptableModal;
