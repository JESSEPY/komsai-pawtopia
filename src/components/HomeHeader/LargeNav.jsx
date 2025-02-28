import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import DogLogo from "../../assets/icons/dog2.svg";
import HomeLogo from "../../assets/icons/sidebar/homeAlt.svg";
import ExploreLogo from "../../assets/icons/sidebar/exploreAlt.svg";
import PetCareLogo from "../../assets/icons/sidebar/petCareAlt.svg";
import FindLogo from "../../assets/icons/sidebar/findAlt.svg";
import MessagesLogo from "../../assets/icons/sidebar/messageAlt.svg";
import storeLogo from "../../assets/icons/sidebar/storeLogo.svg";
import NotificationsLogo from "../../assets/icons/sidebar/notificationAlt.svg";
import listAPet from "../../assets/icons/sidebar/listIcon.svg";
import { useUserProfile } from "../../hooks/userProfile";
import PostLostPetButton from "../Find/PostLostPetButton";
// Hover Icons
import HomeHover from "../../assets/icons/sidebar/homeHover.svg";
import ExploreHover from "../../assets/icons/sidebar/exploreHover.svg";
import PetCareHover from "../../assets/icons/sidebar/petCareHover.svg";
import FindHover from "../../assets/icons/sidebar/findHover.svg";
import MessagesHover from "../../assets/icons/sidebar/messageHover.svg";
import storeHover from "../../assets/icons/sidebar/storeHover.svg";
import NotificationsHover from "../../assets/icons/sidebar/notificationHover.svg";

// ✅ Import Heroicons v2 for Logout Icon
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { logoutUser } from "../../services/authService";

const LargeNav = () => {
  // ✅ Use useUserProfile to get authenticated user data
  const { userProfile: userData, isLoading } = useUserProfile();

  console.log("User Data:", userData);

  const sidebarItems = [
    {
      name: "Home",
      link: "/home",
      icon: HomeLogo,
      iconHover: HomeHover,
      size: "w-8 h-8",
    },
    {
      name: "Explore",
      link: "explore",
      icon: ExploreLogo,
      iconHover: ExploreHover,
      size: "w-8 h-8",
    },
    {
      name: "PetCare",
      link: "petcare",
      icon: PetCareLogo,
      iconHover: PetCareHover,
      size: "w-8 h-8",
    },
    {
      name: "Find",
      link: "find",
      icon: FindLogo,
      iconHover: FindHover,
      size: "w-8 h-8",
    },
    {
      name: "Messages",
      link: "messages",
      icon: MessagesLogo,
      iconHover: MessagesHover,
      size: "w-8 h-8",
    },
    {
      name: "Store",
      link: "Store",
      icon: storeLogo,
      iconHover: storeHover,
      size: "w-8 h-8",
    },
    // {
    //   name: "Notifications",
    //   link: "notifications",
    //   icon: NotificationsLogo,
    //   iconHover: NotificationsHover,
    //   size: "w-8 h-8",
    // },
  ];

  return (
    <div className="w-full h-full relative flex flex-col">
      <NavLink
        to="/"
        className="mb-10 px-2 lg:flex items-center xl:justify-normal lg:justify-center md:justify-center md:block sm:hidden hidden"
      >
        <img src={DogLogo} alt="dog logo" className="w-10 h-auto" />
        <p className="text-customBlue font-arpona font-black xl:block md:hidden sm:hidden hidden">
          Pawtopia
        </p>
      </NavLink>

      <div className="w-full h-auto flex items-start flex-col gap-y-1 xl:pr-6 flex-grow">
        {sidebarItems.map((item) => {
          const [isHovered, setIsHovered] = useState(false);

          return (
            <NavLink
              key={item.name}
              to={item.link}
              end
              className={({ isActive }) =>
                `w-full h-auto flex items-center gap-x-4 p-2 ${
                  isActive ? "text-iconHoverColor" : ""
                } hover:bg-hoverColor xl:justify-normal lg:justify-center md:justify-center rounded-lg ease-out duration-500 group`
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive || isHovered ? item.iconHover : item.icon}
                    alt={`${item.name} icon`}
                    className={`${item.size} object-contain group-hover:scale-105 ease-out duration-500`}
                  />
                  <p
                    className={`font-arpona text-md transition-colors duration-300 hidden xl:block ${
                      isHovered ? "text-iconHoverColor" : "text-defaultColor"
                    } group-hover:text-iconHoverColor`}
                  >
                    {item.name}
                  </p>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Hide "List a Pet" button if the user is an Adopter */}
      {!isLoading && userData?.role !== "Adopter" && (
        <NavLink
          to="listAPet"
          className="mt-auto mb-4 xl:max-w-56 xl:mx-0 mx-auto transition transform hover:-translate-y-2 
          duration-300 font-arpona font-black text-primary h-12 rounded-2xl border-2 border-primary 
          flex items-center justify-center gap-4 shadow-lg shadow-primary/30 px-6"
        >
          <img src={listAPet} alt="List a Pet" className="h-6 w-6" />
          <span className="hidden xl:block">List a Pet</span>
        </NavLink>
      )}

      {/* Render "Post Lost Pet" button ONLY if the user is an Adopter */}
      {!isLoading && userData?.role === "Adopter" && (
        <div className="mt-auto mb-4 xl:max-w-56 xl:mx-0 mx-auto">
          <PostLostPetButton />
        </div>
      )}

      <p>Temporary</p>

      {/* ✅ Logout Button (Using `logoutUser` from authService) */}
      <button
        onClick={logoutUser}
        className="mt-2 mb-6 xl:max-w-56 xl:mx-0 mx-auto flex items-center gap-4 justify-center px-6 py-3 border 
        border-red-500 rounded-2xl text-red-700 font-semibold shadow-lg transition hover:bg-red-100 
        hover:shadow-red-300/50"
      >
        <ArrowRightCircleIcon className="w-6 h-6 text-red-700" />
        <span className="xl:block lg:hidden md:hidden sm:hidden hidden">
          Logout
        </span>
      </button>
    </div>
  );
};

export default LargeNav;
