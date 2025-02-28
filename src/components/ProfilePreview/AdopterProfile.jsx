import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser"; // ✅ Fetch user profile dynamically
import Verified from "../../assets/icons/verifiedPaw.svg";
import AdopterProfileNav from "./ProfileContentNav/AdopterProfileNav";
import { Outlet } from "react-router-dom";
import AdopterProfileBio from "./AdopterProfileContent/AdopterProfileBio";

const AdopterProfilePreview = () => {
  const { userId } = useParams(); // ✅ Get userId from URL
  const { userData, isLoading } = useUser(userId); // ✅ Fetch user data dynamically

  if (isLoading) return <p>Loading profile...</p>;
  if (!userData) return <p>User profile not found.</p>;

  const { userName, profileImg, isVerified } = userData;

  return (
    <div className="container lg:w-[80%] md:w-[90%] sm:w-full w-full h-auto mb-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-6">
        <div className="flex-1 min-w-[60%] mt-4">
          <div className="flex items-center gap-4 mt-4 relative">
            <div className="relative w-16 h-16">
              <img
                src={profileImg || "/default-profile.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
              />
            </div>
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

          {/* Navigation Tabs (Read-Only) */}
          <div className="mt-4">
            <AdopterProfileNav />
          </div>
          <hr className="mt-4 -ml-12 -mr-4" />
          <Outlet />
        </div>

        {/* Adopter Profile Bio (Read-Only) */}
        <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[30%] mt-8 mr-4">
          <AdopterProfileBio />
        </div>
      </div>
    </div>
  );
};

export default AdopterProfilePreview;
