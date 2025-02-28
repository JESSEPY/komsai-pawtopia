import React, { useRef } from "react";
import { useUserProfile } from "../../hooks/userProfile"; // Fetch profile
import { useChangeUserProfile } from "../../hooks/useChangeAdopterProfile"; // Profile image update
import { CameraIcon } from "@heroicons/react/24/solid"; // ✅ Import Heroicons v2 Camera Icon
import Verified from "../../assets/icons/verifiedPaw.svg";
import AdopterProfileNav from "./ProfileContentNav/AdopterProfileNav";
import { Outlet } from "react-router-dom";
import AdopterProfileBio from "./AdopterProfileContent/AdopterProfileBio";

const AdopterProfile = () => {
  const { userProfile, isLoading } = useUserProfile();
  const { updateProfileImage, loading } = useChangeUserProfile();
  const fileInputRef = useRef(null);

  console.log("User Profile", userProfile);

  if (isLoading) return <p>Loading profile...</p>;
  if (!userProfile) return <p>User profile not found.</p>;

  const { userName, profileImg, uid, isVerified } = userProfile;

  console.log("Uid", uid);

  // ✅ Handle file selection and call `updateProfileImage`
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("⚠️ No file selected.");
      return;
    }
    console.log("📸 Selected file:", file.name);

    // Ensure `userProfile` exists before calling `updateProfileImage`
    if (!userProfile?.uid) {
      console.error("❌ Cannot update profile image: User ID is missing.");
      return;
    }

    updateProfileImage(file);
  };

  return (
    <>
      <div className="container lg:w-[80%] md:w-[90%] sm:w-full w-full h-auto mb-10">
        {/* FLEX CONTAINER TO ALIGN PROFILE & NAV WITH BIO CARD */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-6">
          {/* LEFT SECTION: Profile Info & Navigation */}
          <div className="flex-1 min-w-[60%] mt-4">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mt-4 relative">
              {/* Profile Picture Container */}
              <div className="relative w-16 h-16">
                {/* Profile Image */}
                <img
                  src={profileImg || "/default-profile.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 "
                />

                {/* Upload Button Overlay with Camera Icon */}
                <label className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1 shadow-sm cursor-pointer">
                  <CameraIcon className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange} // ✅ Updated event handler
                  />
                </label>
              </div>

              {/* Username & Verified Badge */}
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <p className="font-sans font-semibold text-lg">{userName}</p>
                  {isVerified && (
                    <img
                      src={Verified}
                      alt="Verified"
                      className="w-5 h-5 rotate-12"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-4">
              <AdopterProfileNav />
            </div>

            <hr className="mt-4 -ml-12 -mr-4" />

            {/* Profile Content */}
            <Outlet />
          </div>

          {/* RIGHT SECTION: Adopter Profile Bio Card */}
          <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[30%] mt-8 mr-4">
            <AdopterProfileBio />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdopterProfile;
