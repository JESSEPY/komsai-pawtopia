import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TagModal from "../../../ListAPet/TagModal";
import MediaUpload from "../../../ListAPet/MediaUpload";
import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../../../ListAPet/Swalloader";
import useEditAdoptable from "../../../../hooks/useEditAdoptable";

const EditAdoptablePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { postData, editAdoptable, loading, error } = useEditAdoptable(postId);

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]); // This can hold files (new uploads) or URLs (preloaded)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  // Preload the latest data from Firestore when available
  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setDescription(postData.description || "");
      setTags(postData.tags || []);
      // For media, assume the field is stored as an array of URLs.
      setMediaFiles(postData.media || []);
      if (postData.postType === "List a Pet") {
        setPetName(postData.petName || "");
        setBreed(postData.breed || "");
      }
    }
  }, [postData]);

  const handleSave = async () => {
    // Basic validation
    if (!title.trim() || !description.trim()) {
      showErrorSwal("Title and description are required!");
      return;
    }
    if (tags.length === 0) {
      showErrorSwal("At least one tag is required!");
      return;
    }
    if (postData.postType === "List a Pet") {
      if (!petName.trim()) {
        showErrorSwal("Pet name is required!");
        return;
      }
      if (!breed.trim()) {
        showErrorSwal("Breed is required!");
        return;
      }
    }
    // Optionally, check for at least one image (if needed)

    try {
      showUploadingSwal();

      // If new files are added in mediaFiles (File objects), upload them first.
      // Otherwise, if mediaFiles already contains URLs, just update them.
      // (This example assumes you handle file vs. URL detection in your MediaUpload component.)
      let updatedMedia = mediaFiles;
      if (mediaFiles.length > 0 && mediaFiles[0].name) {
        // For example, use your uploadToCloudinary service here:
        // updatedMedia = await uploadToCloudinary(mediaFiles, "post_photos");
      }

      const updatedData = {
        title,
        description,
        tags,
        media: updatedMedia,
      };

      if (postData.postType === "List a Pet") {
        updatedData.petName = petName;
        updatedData.breed = breed;
      }

      await editAdoptable(updatedData);
      showSuccessSwal("Your post has been updated successfully!");
      navigate("/home/profile"); // Redirect to a desired route after update
    } catch (err) {
      console.error("Error updating post:", err);
      showErrorSwal("Failed to update post. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error loading post data.</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Edit Adoptable Post</h2>

      {/* Title, Description, Tags, and Pet details */}
      <div className="flex flex-col gap-4 rounded-3xl md:w-2/4 sm:w-full w-full mx-auto">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Title<span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder={
              postData.postType === "List a Pet"
                ? "Bella Rescue Cat"
                : "Enter title"
            }
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Pet Name & Breed (only for List a Pet) */}
        {postData.postType === "List a Pet" && (
          <div className="flex flex-row gap-4">
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
          Edit Tags<span className="text-red-600">*</span>
        </button>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-altTagColor text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                className="text-white"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <TagModal
          isOpen={isTagModalOpen}
          onClose={() => setIsTagModalOpen(false)}
          setTags={setTags}
          selectedTags={tags}
        />

        {/* Description */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium text-gray-700">
            {postData.postType === "Event" ? "Event Details" : "Description"}
            <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            placeholder={
              postData.postType === "Event"
                ? "Provide event details like date, location, and activities..."
                : postData.postType === "Story"
                ? "Share a heartfelt rescue, adoption, or pet journey..."
                : postData.postType === "List a Pet"
                ? "Add key pet details: Name, breed, age, personality, health status, and adoption info."
                : "Write your post..."
            }
            className="p-2 border border-listInputBorder bg-sidebarBg rounded-2xl resize-none"
            rows="8"
            maxLength={2200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
      <div className="flex flex-col md:w-2/4 sm:w-full w-full mx-auto">
        <label className="font-medium text-gray-700">
          Media<span className="text-red-600">*</span>
        </label>
        <MediaUpload mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="py-2 px-6 mt-4 bg-altTagColor text-white rounded-full flex items-center justify-center gap-1 w-28 mx-auto transition-transform hover:-translate-y-1 duration-300"
      >
        Save
      </button>
    </div>
  );
};

export default EditAdoptablePage;
