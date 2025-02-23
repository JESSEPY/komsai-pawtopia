import React from "react";
import ProfileNav from "./ProfileNav/ProfileNav";
import SuggestedSheltersData from "./SuggestedSheltersData";
import Verified from "../../assets/icons/verifiedPaw.svg";
import Donation from "../FeedDontations/Donation";

const SuggestedShelters = () => {
  return (
    <>
      <div className="w-full h-auto py-3 flex flex-col gap-4 ">
        {/* Profile Navigation */}
        <ProfileNav />
        {/* Suggested Shelter */}
        <div className="w-full h-auto mt-20  flex gap-4 flex-col bg-suggestedBg rounded-2xl px-5 py-4 ">
          <h1 className="text-sm font-arpona">
            Suggested pet shelters for you
          </h1>

          <div className="flex flex-col gap-4">
            {SuggestedSheltersData.map((shelter) => (
              <div
                key={shelter.id}
                className="flex items-center gap-2 rounded-lg"
              >
                {/* Profile Image */}
                <img
                  src={shelter.profileImg}
                  alt={shelter.username}
                  className="w-8 h-8 rounded-full object-cover"
                />

                {/* Username and Verified */}
                <div className="flex items-center gap-2">
                  <span className="font-arpona font-medium text-sm">
                    {shelter.username}
                  </span>
                  {shelter.isVerified && (
                    <img src={Verified} alt="Verified" className="w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Count */}
        <Donation />
      </div>
    </>
  );
};

export default SuggestedShelters;
