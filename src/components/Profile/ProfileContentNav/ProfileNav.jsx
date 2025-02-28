import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { id: "adoptables", label: "Adoptable", path: "adoptables" },
  { id: "event", label: "Event", path: "event" },
  { id: "story", label: "Story", path: "story" },
  {
    id: "successful-adoptions",
    label: "Successful Adoptions",
    path: "successful-adoptions",
  },
];

const ProfileNav = () => {
  const location = useLocation();
  const navContainerRef = useRef(null);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [cursorHeight, setCursorHeight] = useState("h-2");

  // ✅ Reset the indicator to the active tab when mouse leaves
  useEffect(() => {
    if (navContainerRef.current) {
      const activeTab = navContainerRef.current.querySelector(".active-tab");
      if (activeTab) {
        const { width } = activeTab.getBoundingClientRect();
        setPosition({
          width: width + 2,
          opacity: 1,
          left: activeTab.offsetLeft - 4,
        });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div
        ref={navContainerRef}
        onMouseLeave={() => {
          setCursorHeight("h-1");
          // Reset to active tab when leaving
          const activeTab =
            navContainerRef.current?.querySelector(".active-tab");
          if (activeTab) {
            const { width } = activeTab.getBoundingClientRect();
            setPosition({
              width: width + 2,
              opacity: 1,
              left: activeTab.offsetLeft - 4,
            });
          }
        }}
        onMouseEnter={() => setCursorHeight("h-2")}
        className="relative h-auto flex items-center rounded-lg justify-center md:mr-12 md:text-lg"
      >
        {tabs.map((tab) => (
          <CustomNavLink key={tab.id} to={tab.path} setPosition={setPosition}>
            {tab.label}
          </CustomNavLink>
        ))}
        <Cursor position={position} height={cursorHeight} />
      </div>
      <hr className="md:mr-12" />
    </>
  );
};

const CustomNavLink = ({ to, children, setPosition }) => {
  const ref = useRef(null);
  return (
    <NavLink
      ref={ref}
      to={to}
      className={({ isActive }) =>
        `z-10 cursor-pointer font-sans md:text-sm text-[0.7rem] flex-1 text-center px-4 pt-2 md:m-2 m-1 rounded-md ${
          isActive ? "font-bold text-primary active-tab" : "text-gray-600"
        }`
      }
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width: width + 2,
          opacity: 1,
          left: ref.current.offsetLeft - 4,
        });
      }}
    >
      {children}
    </NavLink>
  );
};

const Cursor = ({ position, height }) => {
  return (
    <motion.div
      animate={position}
      className={`absolute bottom-0 z-0 rounded-lg w-full bg-primary/60 left-0 ${height}`}
    ></motion.div>
  );
};

export default ProfileNav;
