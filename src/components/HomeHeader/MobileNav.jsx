import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeLogo from "../../assets/icons/sidebar/homeAlt.svg";
import ExploreLogo from "../../assets/icons/sidebar/exploreAlt.svg";
import PetCareLogo from "../../assets/icons/sidebar/petCareAlt.svg";
import FindLogo from "../../assets/icons/sidebar/findAlt.svg";
import MessagesLogo from "../../assets/icons/sidebar/messageAlt.svg";
import NotificationsLogo from "../../assets/icons/sidebar/notificationAlt.svg";
import Profile from "../../assets/icons/profile.svg";

// Hover Icons
import HomeHover from "../../assets/icons/sidebar/homeHover.svg";
import ExploreHover from "../../assets/icons/sidebar/exploreHover.svg";
import PetCareHover from "../../assets/icons/sidebar/petCareHover.svg";
import FindHover from "../../assets/icons/sidebar/findHover.svg";
import MessagesHover from "../../assets/icons/sidebar/messageHover.svg";
import NotificationsHover from "../../assets/icons/sidebar/notificationHover.svg";
import ListAPet from "../../assets/icons/sidebar/listIcon.svg";

const MobileNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sidebarItems = [
    {
      name: "Home",
      link: "/home",
      icon: HomeLogo,
      iconHover: HomeHover,
    },
    {
      name: "Explore",
      link: "explore",
      icon: ExploreLogo,
      iconHover: ExploreHover,
    },
    // {
    //   name: "List a Pet",
    //   link: "/list-a-pet",
    //   icon: ListAPet,
    //   iconHover: ListAPet,
    // },
    {
      name: "Find",
      link: "find",
      icon: FindLogo,
      iconHover: FindHover,
    },
    {
      name: "Profile",
      link: "profile",
      icon: Profile,
      iconHover: Profile,
    },
  ];

  return (
    <div className="w-auto h-auto flex items-center justify-evenly gap-x-4">
      {sidebarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className="h-auto flex flex-col items-center p-3 bg-transparent transition-all group hover:font-bold hover:text-iconHoverColor rounded-lg ease-out duration-300"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={hoveredIndex === index ? item.iconHover : item.icon}
            alt={item.name}
            className="w-6 h-6 object-contain"
          />
          <p className="text-xs mt-1 font-roboto">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;
