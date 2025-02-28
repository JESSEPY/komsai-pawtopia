import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAdopterBio } from "../../../hooks/useAdopterBio";
import { logoutUser } from "../../../services/authService";
import AdopterProfileSkeleton from "./AdopterProfileSkeleton";

const AdopterProfileBio = () => {
  const {
    adopterData,
    metrics,
    loading,
    metricsLoading,
    updateHobbies,
    updateCoverImage,
  } = useAdopterBio();

  const [isEditing, setIsEditing] = useState(false);
  const [newHobby, setNewHobby] = useState("");
  const [hobbyList, setHobbyList] = useState([]);

  if (loading || metricsLoading) return <AdopterProfileSkeleton />;
  if (!adopterData) return <p>Profile not found!</p>;

  const { adoptionData, createdAt, userName, coverImage } = adopterData;

  console.log("Cover Image", coverImage);
  const personal = adoptionData?.personal || {};
  const { gender, hobbies = [] } = personal;

  const furTitle = gender === "Male" ? "FURDADDY" : "FURMOMMY";
  const accountDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleDateString()
    : "N/A";

  // Open modal and load existing hobbies
  const handleEditHobbies = () => {
    setHobbyList([...hobbies]);
    setIsEditing(true);
  };

  // Add a new hobby
  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbyList.includes(newHobby.trim())) {
      setHobbyList([...hobbyList, newHobby.trim()]);
      setNewHobby("");
    }
  };

  // Remove a hobby
  const handleRemoveHobby = (hobby) => {
    setHobbyList(hobbyList.filter((h) => h !== hobby));
  };

  // Save updated hobbies
  const handleSaveHobbies = () => {
    updateHobbies(hobbyList);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-slate-100 shadow-sm rounded-xl border overflow-hidden">
      {/* Cover Image Section */}
      <div className="relative">
        <div
          className="w-full h-32 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              coverImage ||
              "https://i.pinimg.com/736x/b6/d2/f2/b6d2f2322c3662377705607936e66441.jpg"
            })`,
          }}
        ></div>

        {/* Edit Cover Button */}
        <label className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-xs cursor-pointer">
          Change Cover
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                updateCoverImage(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      {/* Profile Details */}
      <div className="mt-2 ml-6 mb-8">
        <p className="font-medium text-lg">@{userName}</p>
        <span className="text-xs bg-blue-200 text-slate-800 px-3 py-1 rounded-full">
          {furTitle}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid font-sans grid-cols-2 gap-4 mb-4 px-4 mt-4">
        <div>
          <p className="text-sm font-medium">{metrics.adoptedCount}</p>
          <p className="text-xs text-gray-500">Adopted Pets</p>
        </div>
        <div>
          <p className="text-sm font-medium">{metrics.pendingCount}</p>
          <p className="text-xs text-gray-500">Pending Requests</p>
        </div>
        <div>
          <p className="text-sm font-medium">{accountDate}</p>
          <p className="text-xs text-gray-500">Account Made</p>
        </div>
        <div>
          <p className="text-sm font-medium">{metrics.commentCount}</p>
          <p className="text-xs text-gray-500">Commented Posts</p>
        </div>
      </div>

      <hr />

      {/* Hobbies Section */}
      <div className="mt-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Hobbies</p>
          <button
            onClick={handleEditHobbies}
            className="text-xs text-gray-500 hover:text-gray-800"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {hobbies.length > 0 ? (
            hobbies.map((hobby, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 px-3 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-400">No hobbies yet.</p>
          )}
        </div>
      </div>

      <hr />

      {/* Logout Button */}
      <div className="text-center mt-4 mb-4">
        <button
          onClick={logoutUser}
          className="text-red-500 text-sm font-semibold"
        >
          LOG OUT
        </button>
      </div>

      {/* Hobbies Edit Modal */}
      <Transition appear show={isEditing} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          onClose={() => setIsEditing(false)}
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            {/* Modal Title */}
            <Dialog.Title className="text-xl font-semibold text-center text-gray-800">
              Edit Hobbies
            </Dialog.Title>

            {/* Input + Add Button */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 ring-altTagColor">
                <input
                  type="text"
                  className="w-full text-sm outline-none"
                  placeholder="Enter a hobby..."
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                />
                <button
                  onClick={handleAddHobby}
                  className="bg-altTagColor text-white px-3 py-1.5 rounded-md text-sm hover:bg-opacity-80 transition"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Hobby List */}
            <div className="mt-3 flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {hobbyList.length > 0 ? (
                hobbyList.map((hobby, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm"
                  >
                    <span className="text-sm text-gray-700">{hobby}</span>
                    <button
                      onClick={() => handleRemoveHobby(hobby)}
                      className="text-gray-500 hover:text-red-600 transition"
                    >
                      ✖
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No hobbies added yet.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="text-gray-500 hover:text-gray-700 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-altTagColor text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition"
                onClick={handleSaveHobbies}
              >
                Save
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdopterProfileBio;
