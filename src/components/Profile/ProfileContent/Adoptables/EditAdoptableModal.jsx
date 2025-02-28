import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import TagModal from "../../../ListAPet/TagModal";
import MediaUpload from "../../../ListAPet/MediaUpload";
import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
  showConfirmationSwal,
} from "../../../ListAPet/Swalloader";
import useEditAdoptable from "../../../../hooks/useEditAdoptable";
import { uploadToCloudinary } from "../../../../services/cloudinaryService";

const EditAdoptableModal = ({ isOpen, onClose, adoptable }) => {
  // Use the custom hook with the adoptable id.
  const { postData, editAdoptable, deletePost, unlistPost, loading } =
    useEditAdoptable(adoptable?.id);

  // Determine the post type (defaults to "Default" if none exists)
  const postType = adoptable?.postType || "Default";

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([]); // Preloaded media URLs
  const [mediaFiles, setMediaFiles] = useState([]); // New media files to upload
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  // Preload form fields when postData changes
  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      // Only load petName and breed if postType is "List a Pet"
      if (postType === "List a Pet") {
        setPetName(postData.petName || "");
        setBreed(postData.breed || "");
      }
      setDescription(postData.description || "");
      setTags(postData.tags || []);
      setMediaUrls(postData.mediaUrls || []);
    }
  }, [postData, postType]);

  // Dynamic placeholder for the description based on post type
  const descriptionPlaceholder =
    postType === "List a Pet"
      ? "Add key pet details: Name, breed, age, personality, health status, and adoption info."
      : postType === "Event"
      ? "Provide event details like date, location, and activities..."
      : postType === "Story"
      ? "Share a heartfelt rescue, adoption, or pet journey..."
      : "Write your post...";

  const handleSave = async () => {
    // Basic validation for required fields.
    if (
      !title.trim() ||
      !description.trim() ||
      (postType === "List a Pet" && (!petName.trim() || !breed.trim()))
    ) {
      showErrorSwal("All required fields must be filled!");
      return;
    }

    try {
      showUploadingSwal();

      let updatedMediaUrls = [...mediaUrls];
      if (mediaFiles.length > 0) {
        const uploadedUrls = await uploadToCloudinary(mediaFiles);
        updatedMediaUrls = [...updatedMediaUrls, ...uploadedUrls];
      }

      // Build updated data, conditionally including petName and breed if applicable.
      const updatedData = {
        title,
        description,
        tags,
        mediaUrls: updatedMediaUrls,
      };
      if (postType === "List a Pet") {
        updatedData.petName = petName;
        updatedData.breed = breed;
      }

      await editAdoptable(updatedData);
      showSuccessSwal("Post updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating post:", err);
      showErrorSwal("Failed to update post.");
    }
  };

  // Handle Delete Post (using unlistPost in this example)
  const handleDeletePost = async () => {
    const confirmed = await showConfirmationSwal(
      "Are you sure?",
      "This will permanently delete the post and all associated media!"
    );
    if (!confirmed) return;
    try {
      showUploadingSwal("Deleting post...");
      await unlistPost();
      showSuccessSwal("Post deleted successfully!");
      onClose();
    } catch (err) {
      console.error("Error deleting post:", err);
      showErrorSwal("Failed to delete post.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={onClose}
      >
        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </Transition.Child>
        <Transition.Child
          enter="transition-transform duration-300"
          enterFrom="scale-90 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-transform duration-200"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-90 opacity-0"
        >
          <div className="bg-gray-50 w-screen h-screen overflow-y-auto p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4">
              <XMarkIcon className="h-8 w-8 text-gray-500 hover:text-red-600" />
            </button>
            <div className="flex flex-col gap-6 px-8 max-w-4xl mx-auto">
              {/* Title Field */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Title<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="p-2 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Render Pet Name & Breed only if postType is "List a Pet" */}
              {postType === "List a Pet" && (
                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="font-medium text-gray-700">
                      Pet Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded-lg"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="font-medium text-gray-700">
                      Breed<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded-lg"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Tags Section */}
              <button
                className="bg-gray-400 text-white py-2 w-28 rounded-full"
                onClick={() => setIsTagModalOpen(true)}
              >
                Edit Tags
              </button>
              <TagModal
                isOpen={isTagModalOpen}
                onClose={() => setIsTagModalOpen(false)}
                setTags={setTags}
                selectedTags={tags}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-altTagColor text-white px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {tag}
                    <button
                      className="text-white"
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Description Field */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Description<span className="text-red-600">*</span>
                </label>
                <textarea
                  className="p-2 border rounded-lg"
                  rows="12"
                  placeholder={descriptionPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Current Media Preview */}
              <div>
                <label className="font-medium text-gray-700">
                  Current Images
                </label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {mediaUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="rounded-lg object-cover w-full h-32"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                        onClick={() =>
                          setMediaUrls(mediaUrls.filter((_, i) => i !== index))
                        }
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Upload New Media
                </label>
                <MediaUpload
                  mediaFiles={mediaFiles}
                  setMediaFiles={setMediaFiles}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-altTagColor text-white py-2 px-6 rounded-full transition hover:-translate-y-2 duration-300 w-28"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleDeletePost}
                  className="py-2 px-6 bg-red-600 text-white rounded-full transition hover:-translate-y-2 duration-300"
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default EditAdoptableModal;
