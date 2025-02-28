import React, { useRef } from "react";
import { useUserProfile } from "../../hooks/userProfile"; // Fetch profile
import { useChangeUserProfile } from "../../hooks/useChangeAdopterProfile"; // Profile image update
import { CameraIcon } from "@heroicons/react/24/solid"; // ✅ Import Heroicons v2 Camera Icon
import Verified from "../../assets/icons/verifiedPaw.svg";
import StoreNav from "./StoreContentNav/StoreNav";
import { Outlet } from "react-router-dom";
import AdopterProfileBio from "./StoreContent/AdopterProfileBio";

const Store = () => {
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
        

            {/* Navigation Tabs */}
            <div className="mt-4">
              <StoreNav />
            </div>

            <hr className="mt-4 -ml-12 -mr-4" />

            {/* Profile Content */}
            <Outlet />
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Store;
