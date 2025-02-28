import React from "react";
import { useParams } from "react-router-dom"; // ✅ Extracts userId from URL
import { useUser } from "../../hooks/useUser"; // ✅ Fetch profile dynamically
import Verified from "../../assets/icons/verifiedPaw.svg";
import ProfileNav from "./ProfileContentNav/ProfileNav";
import { useUserPetPostCountsById } from "../../hooks/useUserPetPostCounts"; // ✅ Use new hook for real-time post counts
import { Outlet } from "react-router-dom";
import DonateButton from "../Profile/DonateButton";

const ShelterProfilePreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from URL

  const { userData, isLoading } = useUser(userId);
  const { totalListAPet, approvedCount } = useUserPetPostCountsById(userId); // ✅ Use the new hook

  console.log("Total pets:", totalListAPet, "Approved:", approvedCount);

  if (isLoading) return <p>Loading profile...</p>;
  if (!userData) return <p>User profile not found.</p>;

  const { userName, isVerified, profileImg, coverImage, profileDescription } =
    userData;

  return (
    <>
      <div className="container lg:w-[80%] md:w-[80%] sm:w-full w-full h-auto lg:block md:block sm:hidden hidden mb-10">
        <div className="w-full h-auto flex flex-col items-center justify-center mb-10">
          {/* Profile Cover */}
          <div className="relative w-full h-64 my-6 mr-12 rounded-t-[2.5rem]">
            <img
              src={coverImage || "/default-cover.jpg"}
              alt="Cover"
              className="absolute inset-0 object-cover w-full h-full rounded-t-[2.5rem]"
            />

            {/* Profile Picture and Stats */}
            <div className="absolute left-6 top-56 flex items-center w-full">
              <img
                src={profileImg || "/default-profile.png"}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-white"
              />

              <div className="flex flex-col ml-2 gap-1 mt-4">
                {/* Username */}
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

                {/* Adoptable Count and Successful Adoptions */}
                <div className="flex gap-2">
                  <div className="text-sm font-sans font-bold">
                    {totalListAPet}{" "}
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

        {/* Profile Navigation */}
        <ProfileNav />

        {/* Profile Content */}
        <Outlet />
      </div>
    </>
  );
};

export default ShelterProfilePreview;
