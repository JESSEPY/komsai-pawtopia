import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ListAPet from "./ListAPet";

const CreatePostTabs = () => {
  const [activeTab, setActiveTab] = useState("List a Pet");
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [cursorHeight, setCursorHeight] = useState("h-2");

  // Create a ref for the default active tab ("List a Pet")
  const defaultTabRef = useRef(null);

  // On mount, measure the default tab and set the indicator position
  useEffect(() => {
    if (defaultTabRef.current) {
      const { width } = defaultTabRef.current.getBoundingClientRect();
      setPosition({
        left: defaultTabRef.current.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div
        onMouseLeave={() => setCursorHeight("h-1")}
        onMouseEnter={() => setCursorHeight("h-2")}
        className="relative h-auto flex md:w-2/5 sm:w-4/5 w-4/5 rounded-lg md:mr-12 md:text-lg"
      >
        <CustomTab
          tabName="List a Pet"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setPosition={setPosition}
          // Pass the ref to the default tab
          refProp={defaultTabRef}
        >
          List a Pet
        </CustomTab>
        <CustomTab
          tabName="Event"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setPosition={setPosition}
        >
          Event
        </CustomTab>
        <CustomTab
          tabName="Story"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setPosition={setPosition}
        >
          Story
        </CustomTab>
        <Cursor position={position} height={cursorHeight} />
      </div>

      {/* Content - Always renders `ListAPet` with the appropriate `postType` */}
      <div className="mt-6 w-full">
        <ListAPet postType={activeTab} />
      </div>
    </div>
  );
};

// Custom Tab Component
// Accepts an optional "refProp" to allow the parent to control the default tab
const CustomTab = ({
  tabName,
  activeTab,
  setActiveTab,
  setPosition,
  children,
  refProp,
}) => {
  // Use the passed ref if provided; otherwise, create a new one
  const ref = refProp || useRef(null);

  return (
    <button
      ref={ref}
      onClick={() => {
        setActiveTab(tabName);
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={`z-10 cursor-pointer font-sans md:text-sm text-center text-[0.7rem] flex-1 pt-2 md:m-2 m-1 rounded-md ${
        activeTab === tabName ? "text-primary font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
};

// Cursor Animation Component
const Cursor = ({ position, height }) => {
  return (
    <motion.div
      animate={position}
      className={`absolute bottom-0 z-0 rounded-b-lg w-full bg-primary/60 left-0 ${height}`}
    ></motion.div>
  );
};

export default CreatePostTabs;
