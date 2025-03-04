import React from "react";
import TopNav from "../TopNav/TopNav";
import FeedCard from "./FeedCard/FeedCard";
import Verify from "../VerifiyAccount/Verify";
import SuggestedShelters from "../SuggestedShelters/SuggestedShelters";
import { useUserProfile } from "../../hooks/userProfile";

const Event = () => {
  const { userProfile, isLoading, error, userId } = useUserProfile();

  const isVerified = userProfile?.isVerified;

  return (
    <>
      <div className="lg:w-[50%] sm:w-full w-full min-h-screen px-3 flex  items-start gap-x-20">
        <div className="lg:w md:w-full sm:w-full w-full h-auto relative">
          {/* Verify Section / Ad (only show if user is not verified) */}
          {!isLoading && !isVerified && <Verify />}

          {/* Top Navbar (only visible on smalls screen) */}
          <TopNav />
          {/* Search Section */}
          {/* Verify Section / Ad */}

          {/* Feed */}
          <div className="w-full h-auto flex items-center justify-center mt-6">
            <div className="lg:w-[73%] md:w-[73%] sm:w-[100%] w-[100%] h-auto">
              <FeedCard />
            </div>
          </div>
        </div>
      </div>
      {/* Recommended Shelters Section (Fixed) */}
      {/* <div className="hidden lg:block">
        <div className="fixed top-4 right-8 w-[300px]">
          <SuggestedShelters />
        </div>
      </div> */}
    </>
  );
};

export default Event;
