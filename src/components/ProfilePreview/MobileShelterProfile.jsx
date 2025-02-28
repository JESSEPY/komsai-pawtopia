import React from "react";
import ShelterProfilesMockData from "./ShelterProfilesMockData";
import Verified from "../../assets/icons/verifiedPaw.svg";
import ProfileNav from "./ProfileContentNav/ProfileNav";
import AdoptableCard from "./ProfileContent/Adoptables/AdoptableCard";
import AdoptablesMockData from "./ProfileContent/Adoptables/AdoptablesMockData";
import Adoptables from "./ProfileContent/Adoptables/Adoptables";
import { Outlet } from "react-router-dom";
import DonateButton from "./DonateButton";

const MobileShelterProfile = () => {
  //Trial data
  const userProfile = ShelterProfilesMockData.find(
    (profile) => profile.user_id === 1
  );

  // Get profile picture and cover photo
  const {
    username,
    profilePicUrl,
    coverPhotoUrl,
    isVerified,
    AdoptablesCount,
    SuccessfulAdoptionCount,
    profileDescription,
  } = userProfile;

  return (
    <>
      <div className="container w-full h-auto  md:hidden mb-10 overflow-hidden">
        <div className="w-full h-auto flex flex-col items-center justify-center mb-10">
          {/* Profile Cover (pfp, cover, adoptables, successful adoptables) */}
          <div className="relative w-full h-56 rounded-t-[2.5rem]">
            {/* Cover Photo (background) */}
            <img
              src={coverPhotoUrl}
              alt=""
              className="absolute inset-0 object-cover w-full h-full rounded-t-[2.5rem]"
            />

            {/* Profile Picture and Donate*/}
            <div className="absolute top-48 flex items-center ml-2 w-full">
              {/* Profile Picture */}
              <img
                src={profilePicUrl}
                alt=""
                className="h-24 w-24 rounded-full object-cover border-4 border-white"
              />

              {/* Donate Button */}
              <div className="flex-grow flex justify-end mt-4">
                <DonateButton />
              </div>
            </div>
          </div>
        </div>

        {/* Username and Counts */}

        <div className="flex flex-col gap-1 mx-4 mt-16">
          {/* Username */}
          <div className="flex gap-1 items-center">
            <p className="font-sans font-semibold text-lg">{username}</p>{" "}
            {isVerified && (
              <img
                src={Verified}
                alt="Verified"
                className="w-5 h-5 rotate-12"
              />
            )}
          </div>

          {/* Adoptable Count and Successful Adoption Count */}
          <div className="flex gap-2">
            <div className="text-sm font-sans font-bold mr">
              {AdoptablesCount}
              <span className="ml-1  font-sans font-medium">Adoptables</span>
            </div>
            <div className="text-sm font-semibold">
              {SuccessfulAdoptionCount}{" "}
              <span className="ml-1  font-sans font-medium">
                Successful Adoption
              </span>
            </div>
          </div>
        </div>

        {/* Profile Description */}
        <div className="w-full container h-auto flex flex-col mx-4 mt-4 justify-center mb-10">
          <p className="font-sans md:text-sm text-[0.7rem] pr-8">
            {profileDescription}
          </p>
        </div>

        {/* Edit and Settings */}

        <div className="flex gap-4 items-center mx-4 mb-4">
          <button className="px-8 py-2 bg-gray-200 rounded-lg text-sm w-36">
            Edit Profile
          </button>

          <button className="px-8 py-2 bg-gray-200 rounded-lg text-sm w-36">
            Settings
          </button>
        </div>

        {/* Profile Nav */}
        <ProfileNav />

        {/* Profile Content */}
        <Outlet />
      </div>
    </>
  );
};

export default MobileShelterProfile;
