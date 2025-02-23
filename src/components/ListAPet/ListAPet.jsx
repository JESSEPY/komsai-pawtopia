import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import TagModal from "./TagModal";
import MediaUpload from "./MediaUpload";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { uploadToCloudinary } from "../../services/cloudinaryService";
import { savePost } from "../../services/postService";
import TestSwalButton from "./TestSwalButton"; // Test Button

import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "./Swalloader"; // SweetAlert functions

const auth = getAuth();
const MySwal = withReactContent(Swal);

const ListAPet = ({ postType }) => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [user] = useAuthState(auth);
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");

  console.log("Received postType in ListAPet:", postType);

  const handleSave = async () => {
    if (!user) {
      showErrorSwal("You must be logged in to post!");
      return;
    }

    if (!title.trim()) {
      showErrorSwal("Title is required!");
      return;
    }

    if (!description.trim()) {
      showErrorSwal("Description is required!");
      return;
    }

    if (tags.length === 0) {
      showErrorSwal("At least one tag is required!");
      return;
    }

    // Ensure at least one image is uploaded
    const hasImage = mediaFiles.some((file) =>
      file.name?.match(/\.(jpeg|jpg|png|gif|bmp|webp)$/i)
    );

    if (!hasImage) {
      showErrorSwal("At least one image is required!");
      return;
    }

    // If post type is "List a Pet", require pet name and breed
    if (postType === "List a Pet") {
      if (!petName.trim()) {
        showErrorSwal("Pet name is required!");
        return;
      }

      if (!breed.trim()) {
        showErrorSwal("Breed is required!");
        return;
      }
    }

    console.log("Post Type Before Saving:", postType); // Debugging

    try {
      showUploadingSwal();

      const uploadedUrls = await uploadToCloudinary(mediaFiles, "post_photos");

      const postData = {
        title,
        description,
        tags,
        media: uploadedUrls,
        userId: user.uid,
        userEmail: user.email,
        postType,
        ...(postType === "List a Pet" && { petName, breed }), // Include only for "List a Pet"
      };

      console.log("Saving Post Data:", postData); // Debugging

      await savePost(postData);
      showSuccessSwal(
        "Your post has been successfully shared! 🐾 Let's help find a loving home!"
      );

      // Reset form fields
      setTitle("");
      setDescription("");
      setTags([]);
      setMediaFiles([]);
      setPetName("");
      setBreed("");
    } catch (error) {
      console.error("Error saving post:", error);
      showErrorSwal("Failed to save post. Please try again.");
    }
  };

  return (
    <>
      {/* Title, Description, Tags */}
      <div className="flex flex-col gap-4 rounded-3xl md:w-2/4 sm:w-full w-full">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Title
            <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder={
              postType === "List a Pet" ? "Bella Rescue Cat" : "Enter title"
            }
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Pet Name & Breed (Only for List a Pet) */}
        {postType === "List a Pet" && (
          <div className="flex flex-row gap-4">
            {/* Pet Name */}
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-medium text-gray-700">
                Pet Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter pet's name"
                className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg w-full"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>

            {/* Breed */}
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-medium text-gray-700">
                Breed<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter breed"
                className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg w-full"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <button
          className="bg-gray-400/80 rounded-full text-white py-2 w-28 text-sm transition-transform hover:-translate-y-1 duration-300"
          onClick={() => setIsTagModalOpen(true)}
        >
          Add Tags<span className="text-red-600">*</span>
        </button>

        {/* Display Selected Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-altTagColor text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                className="text-white"
                onClick={() => {
                  setTags(tags.filter((_, i) => i !== index));
                }}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Tag Modal */}
        <TagModal
          isOpen={isTagModalOpen}
          onClose={() => setIsTagModalOpen(false)}
          setTags={setTags}
          selectedTags={tags}
        />

        {/* Description */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium text-gray-700">
            {postType === "Event" ? "Event Details" : "Description"}
            <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            placeholder={
              postType === "Event"
                ? "Provide event details like date, location, and activities..."
                : postType === "Story"
                ? "Share a heartfelt rescue, adoption, or pet journey..."
                : postType === "List a Pet"
                ? "Add key pet details: Name, breed, age, personality, health status, and adoption info."
                : "Write your post..."
            }
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-2xl resize-none"
            rows="8"
            maxLength={2200} // ✅ Limits input to 2,200 characters
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Character Counter */}
          <p
            className={`text-right text-sm ${
              description.length >= 2200 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {description.length}/2200
          </p>
        </div>
      </div>

      {/* Media Upload */}
      <div className="flex flex-col md:w-2/4 sm:w-full w-full">
        <label className="font-medium text-gray-700">
          Media<span className="text-red-600">*</span>
        </label>
        <MediaUpload mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="py-2 px-6 mt-4 bg-altTagColor text-white rounded-full flex items-center justify-center gap-1 w-28 transition-transform hover:-translate-y-1 duration-300"
      >
        Save
      </button>
    </>
  );
};

export default ListAPet;
