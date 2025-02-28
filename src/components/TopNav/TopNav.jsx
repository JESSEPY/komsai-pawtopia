import React from "react";
import { NavLink } from "react-router-dom";
import DogLogo from "../../assets/icons/dog2.svg";
import Settings from "../../assets/icons/boneBurger.svg";
import Messages from "../../assets/icons/sidebar/messageAlt.svg";
const TopNav = () => {
  return (
    <>
      <div className="w-full h-auto mb-5 mt-2 lg:hidden md:hidden sm:block block">
        <div className="w-full h-auto flex items-center justify-between">
          <NavLink className="flex items-center" to="/">
            <img
              src={DogLogo}
              alt="dog logo"
              className="w-8 h-auto object-contain"
            />
          </NavLink>
          <div className="flex items-center gap-x-4">
            <NavLink className="flex items-center" to="/">
              <img
                src={Settings}
                alt="dog logo"
                className="w-8 h-auto object-contain"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
