import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useChangeUserProfile } from "../../hooks/useChangeAdopterProfile"; // Profile image update
import { X, Upload } from "lucide-react"; // Using Lucide React for icons

const EditProfileModal = ({ isOpen, closeModal, userProfile, altTagColor }) => {
  const {
    updateProfileImage,
    updateCoverImage,
    updateProfileDescription,
    loading,
  } = useChangeUserProfile();

  const [newProfileImg, setNewProfileImg] = useState(null);
  const [newCoverImg, setNewCoverImg] = useState(null);
  const [newDescription, setNewDescription] = useState(
    userProfile?.profileDescription || ""
  );

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewProfileImg(file);
  };

  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewCoverImg(file);
  };

  // Handle description change
  const handleDescriptionChange = (e) => setNewDescription(e.target.value);

  // Clear selected profile image
  const clearProfileImage = () => setNewProfileImg(null);

  // Clear selected cover image
  const clearCoverImage = () => setNewCoverImg(null);

  // Handle Save Changes
  const handleSaveChanges = async () => {
    try {
      if (newProfileImg) await updateProfileImage(newProfileImg);
      if (newCoverImg) await updateCoverImage(newCoverImg);
      if (
        newDescription.trim() !== "" && // Ensures description is not empty or just spaces
        newDescription !== userProfile.profileDescription
      ) {
        await updateProfileDescription(newDescription);
      }

      closeModal(); // Close modal after updates
    } catch (error) {
      console.error("Error saving profile updates:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl p-8 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-6 text-center">
              Edit Profile
            </Dialog.Title>

            {/* Profile Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium">Profile Image</label>
              <div className="relative flex items-center gap-4">
                <input
                  type="file"
                  id="profile-image-upload"
                  className="hidden"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="flex items-center gap-2 px-5 py-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  <Upload size={18} />
                  {newProfileImg ? newProfileImg.name : "Choose a file"}
                </label>
                {/* X Button to Clear Profile Image */}
                {newProfileImg && (
                  <button
                    onClick={clearProfileImage}
                    className="ml-2 text-gray-500 hover:text-red-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium">Cover Image</label>
              <div className="relative flex items-center gap-4">
                <input
                  type="file"
                  id="cover-image-upload"
                  className="hidden"
                  onChange={handleCoverImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="cover-image-upload"
                  className="flex items-center gap-2 px-5 py-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  <Upload size={18} />
                  {newCoverImg ? newCoverImg.name : "Choose a file"}
                </label>
                {/* X Button to Clear Cover Image */}
                {newCoverImg && (
                  <button
                    onClick={clearCoverImage}
                    className="ml-2 text-gray-500 hover:text-red-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium">
                Profile Description
              </label>
              <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                className="w-full p-3 border rounded-lg text-sm"
                rows="4"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className={`px-5 py-2 rounded-full text-white bg-altTagColor transition duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
