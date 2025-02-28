import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const navContainerRef = useRef(null);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [cursorHeight, setCursorHeight] = useState("h-1");
  const [activeTab, setActiveTab] = useState("adoptables");

  // ✅ Auto-navigate to "adoptables" if no valid tab is selected
  useEffect(() => {
    const foundTab = tabs.find((tab) => location.pathname.endsWith(tab.path));

    if (!foundTab) {
      navigate("adoptables", { replace: true });
      setActiveTab("adoptables");
    } else {
      setActiveTab(foundTab.id);
    }
  }, [location.pathname, navigate]);

  // ✅ Update the indicator position when the active tab changes
  useEffect(() => {
    if (navContainerRef.current) {
      const activeLink = navContainerRef.current.querySelector(
        `a[href$="${activeTab}"]`
      );
      if (activeLink) {
        const { width } = activeLink.getBoundingClientRect();
        setPosition({
          width: width + 2,
          opacity: 1,
          left: activeLink.offsetLeft - 4,
        });
      }
    }
  }, [activeTab]);

  return (
    <>
      <div
        ref={navContainerRef}
        onMouseLeave={() => setCursorHeight("h-1")}
        onMouseEnter={() => setCursorHeight("h-2")}
        className="relative h-auto flex items-center rounded-lg justify-center md:mr-12 md:text-lg"
      >
        {tabs.map((tab) => (
          <CustomNavLink
            key={tab.id}
            to={tab.path}
            setPosition={setPosition}
            setCursorHeight={setCursorHeight}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {tab.label}
          </CustomNavLink>
        ))}
        <Cursor position={position} height={cursorHeight} />
      </div>
      <hr className="md:mr-12" />
    </>
  );
};

const CustomNavLink = ({
  to,
  children,
  setPosition,
  setCursorHeight,
  activeTab,
  setActiveTab,
}) => {
  const ref = useRef(null);

  return (
    <NavLink
      ref={ref}
      to={to}
      className={({ isActive }) =>
        `z-10 cursor-pointer font-sans md:text-sm text-[0.7rem] flex-1 text-center px-4 pt-2 md:m-2 m-1 rounded-md ${
          isActive ? "font-bold text-primary" : "text-gray-600"
        }`
      }
      onClick={() => setActiveTab(to)} // ✅ Update active tab when clicked
      onMouseEnter={() => {
        setCursorHeight("h-2"); // ✅ Expand cursor on hover

        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width: width + 2,
          opacity: 1,
          left: ref.current.offsetLeft - 4,
        });
      }}
      onMouseLeave={() => {
        setCursorHeight("h-1"); // ✅ Shrink cursor when unhovered

        // ✅ Revert to active tab when leaving
        const activeTabLink = document.querySelector(`a[href$="${activeTab}"]`);
        if (activeTabLink) {
          const { width } = activeTabLink.getBoundingClientRect();
          setPosition({
            width: width + 2,
            opacity: 1,
            left: activeTabLink.offsetLeft - 4,
          });
        }
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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute bottom-0 z-0 rounded-lg ${height} bg-primary/60`}
    ></motion.div>
  );
};

export default ProfileNav;
