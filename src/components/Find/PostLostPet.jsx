import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

import TagModal from "../ListAPet/TagModal";
import MediaUpload from "../ListAPet/MediaUpload";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { uploadToCloudinary } from "../../services/cloudinaryService";
import { savePost } from "../../services/postService";
import { useUserProfile } from "../../hooks/userProfile";

import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../ListAPet/Swalloader"; // SweetAlert functions

const auth = getAuth();
const MySwal = withReactContent(Swal);

/**
 * Dedicated form component for Lost Pet postings.
 * This version does NOT rely on the tab system.
 */
const PostLostAPet = () => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [reward, setReward] = useState(""); // ✅ Always visible but optional
  const [age, setAge] = useState(""); // ✅ New Age Field (Optional)

  const { userProfile, loading } = useUserProfile();

  // ✅ Extract `userName` exactly as it appears in Firestore
  const {
    userName = "Loading...",
    profilePicUrl = "https://pawtopia.scarlet2.io/images/image.png",
    isVerified = false,
    adoptablesCount = 0,
    successfulAdoptionCount = 0,
    profileDescription = "",
  } = userProfile || {}; // Prevents errors if userProfile is null
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [user] = useAuthState(auth);

  // Hardcode the postType to "Lost Pet"
  const postType = "Lost Pet";

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

    // For a lost pet post, let's assume petName & breed are also required
    if (!petName.trim()) {
      showErrorSwal("Pet name is required!");
      return;
    }

    if (!breed.trim()) {
      showErrorSwal("Breed is required!");
      return;
    }

    // ✅ Validate Age (Now Required & Must Be a Positive Number)
    if (!age.trim() || isNaN(age) || Number(age) <= 0) {
      showErrorSwal("Age is required and must be a positive number.");
      return;
    }

    try {
      showUploadingSwal();

      // Upload images to Cloudinary
      const uploadedUrls = await uploadToCloudinary(mediaFiles, "post_photos");

      // Prepare post data
      const postData = {
        title,
        description,
        tags,
        media: uploadedUrls,
        userId: user.uid,
        userEmail: user.email,
        postType, // Always "Lost Pet"
        petName,
        breed,
        age: Number(age), // ✅ Always included (Required)
        ...(reward.trim() && { reward: Number(reward) }), // ✅ Only include reward if entered
      };

      // Save to DB
      await savePost(postData);
      showSuccessSwal(
        "Your lost pet post has been shared! We hope you find your companion soon."
      );

      // Reset form
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
    <div className="w-full ml-0">
      <div className="container flex flex-col gap-4 relative py-4">
        <button
          onClick={handleBackClick}
          className="rounded-ful transition-colors"
        >
          <ArrowLeftCircleIcon
            className="h-12 w-12 text-[#4F4F4F] transition hover:text-primary duration-300"
            strokeWidth={0.8}
          />
        </button>
        <h1 className="text-xl font-bold">Create a Post</h1>

        {/* Profile */}
        <div className="rounded-3xl gap-2 flex border-2 border-primary py-1 bg-listProfileBg w-32 items-center justify-center">
          <img src={profilePicUrl} alt="" className="h-6 w-6 rounded-full" />
          <p className="text-sm">{userName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-3xl md:w-2/4 sm:w-full w-full">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Missing Golden Retriever"
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Pet Name & Breed */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-medium text-gray-700">
              Pet Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter pet's name"
              className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg w-full"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-medium text-gray-700">
              Breed <span className="text-red-600">*</span>
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

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-medium text-gray-700">
              Reward Amount (Optional)
            </label>
            <input
              type="number"
              placeholder="Enter reward amount"
              className="p-2 border rounded-lg w-full"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              min="0" // ✅ Prevents values below 0
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-medium text-gray-700">
              Age <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className="p-2 border rounded-lg w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1" // ✅ Prevents negative values and zero
            />
          </div>
        </div>

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
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Where and when was your pet last seen? Any distinctive marks or details?"
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-2xl resize-none"
            rows="8"
            maxLength={2200}
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

        {/* Media Upload */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">
            Media <span className="text-red-600">*</span>
          </label>
          <MediaUpload mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="py-2 px-6 mt-4 mb-4 bg-altTagColor text-white rounded-full flex items-center justify-center gap-1 w-28 transition-transform hover:-translate-y-1 duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PostLostAPet;
