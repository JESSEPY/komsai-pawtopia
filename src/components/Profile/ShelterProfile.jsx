import React from "react";
import { useState } from "react";
import ShelterProfilesMockData from "./ShelterProfilesMockData";
import Verified from "../../assets/icons/verifiedPaw.svg";
import ProfileNav from "./ProfileContentNav/ProfileNav";
import { useUserProfile } from "../../hooks/userProfile"; // Fetch profile
import useUserPetPostCounts from "../../hooks/useUserPetPostCounts"; // Fetch pet post counts
import { Outlet } from "react-router-dom";
import DonateButton from "./DonateButton";
import MobileShelterProfile from "./MobileShelterProfile";
import EditProfileModal from "./EditProfileModal";

const ShelterProfile = () => {
  const { userProfile, isLoading } = useUserProfile();
  const { totalListAPet, approvedCount } = useUserPetPostCounts(); // Fetch dynamic data

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    userName,
    isVerified,
    profileImg,
    coverImage,
    profileDescription,
    email,
    role,
    uid,
  } = userProfile || {};

  console.log("Shelter profile", userProfile);

  return (
    <>
      <div className="container lg:w-[80%] md:w-[80%] sm:w-full w-full h-auto lg:block md:block sm:hidden hidden mb-10">
        <div className="w-full h-auto flex flex-col items-center justify-center mb-10">
          {/* Profile Cover */}
          <div className="relative w-full h-64 my-6 mr-12 rounded-t-[2.5rem]">
            {/* Cover Photo */}
            <img
              src={coverImage}
              alt="Cover"
              className="absolute inset-0 object-cover w-full h-full rounded-t-[2.5rem]"
            />

            {/* Profile Picture and Stats */}
            <div className="absolute left-6 top-56 flex items-center w-full">
              {/* Profile Picture */}
              <img
                src={profileImg}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-white"
              />

              <div className="flex flex-col ml-2 gap-1 mt-4">
                {/* Username */}
                <div className="flex gap-1 items-center">
                  <p className="font-sans font-semibold text-lg">{userName}</p>{" "}
                  {isVerified && (
                    <img
                      src={Verified}
                      alt="Verified"
                      className="w-5 h-5 rotate-12"
                    />
                  )}
                </div>

                {/* Adoptable Count and Successful Adoptions (Live Data) */}
                <div className="flex gap-2">
                  <div className="text-sm font-sans font-bold">
                    {totalListAPet}
                    <span className="ml-1 font-sans font-medium">
                      Adoptables
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    {approvedCount}{" "}
                    <span className="ml-1 font-sans font-medium">
                      Successful Adoptions
                    </span>
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <div className="flex-grow flex justify-end">
                <DonateButton />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Description */}
        <div className="w-full container h-auto flex flex-col mt-24 justify-center mb-10">
          <p className="font-sans text-sm pr-12">{profileDescription}</p>
        </div>

        {/* Edit and Settings */}
        <div className="flex gap-4 items-center mb-4">
          {/* Edit Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2 bg-gray-200 rounded-lg text-sm w-36 transition hover:bg-gray-300 duration-300"
          >
            Edit Profile
          </button>

          {/* Edit Profile Modal */}
          <EditProfileModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            userProfile={userProfile}
          />
        </div>

        {/* Profile Navigation */}
        <ProfileNav />

        {/* Profile Content */}
        <Outlet />
      </div>

      <MobileShelterProfile />
    </>
  );
};

export default ShelterProfile;
