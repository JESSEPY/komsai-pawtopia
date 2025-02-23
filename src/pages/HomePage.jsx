import React from "react";
import { NavLink } from "react-router-dom";
import LargeNav from "../components/HomeHeader/LargeNav";
import MobileNav from "../components/HomeHeader/MobileNav";
import Feed from "../components/Feed/Feed";
import ShelterProfile from "../components/Profile/ShelterProfile";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div
        className="w-full h-auto flex items-start justify-between lg:gap-x-12 md:gap-x-10
        sm:gap-x-8 gap-x-4 relative"
      >
        {/* Sidebar Section */}
        <div
          className="xl:min-w-[20%] lg:w-[12%] md:w-[12%] sm:w-none w-none h-[100vh] pt-5 px-3 border-r
        border-r-gray-300/70 bg-sidebarBg sticky top-0 left-0 lg:block md:block sm:hidden hidden"
        >
          <LargeNav />
        </div>
        {/* Bottom Navbar for small Screen */}

        <div className="w-full h-auto py-1 px-3 bg-white border-t border-t-primary fixed bottom-0 left-0 lg:hidden md:hidden sm:block block z-50">
          <MobileNav />
        </div>
        {/* Feed and Profile routing section */}
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
