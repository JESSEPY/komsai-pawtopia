import React from "react";
import { NavLink } from "react-router-dom";
import { useUserProfile } from "../../../hooks/userProfile";
import Profile from "../../../assets/icons/profile.svg";
import NotificationsContainer from "./NotificationContainer"; // ✅ Import the real-time notifications container

const ProfileNav = () => {
  // ✅ Fetch authenticated user data
  const { userProfile: userData } = useUserProfile();

  // Determine profile route based on user role
  const profileRoute =
    userData?.role === "Shelter" ? "/home/profile" : "/home/adopter-profile";

  return (
    <div className="w-full h-auto justify-end flex items-center gap-2">
      <div className="flex gap-2">
        {/* ✅ Real-time Notification Dropdown */}
        <NotificationsContainer />

        {/* Profile Section */}
        <NavLink
          to={profileRoute}
          className="flex items-center justify-center gap-1 flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={userData?.profileImg || Profile}
              alt="User Profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-arpona font-medium">
            {userData?.userName || "User"}
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileNav;
