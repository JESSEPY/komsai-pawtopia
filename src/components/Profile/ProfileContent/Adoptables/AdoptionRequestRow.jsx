import React, { useState, useRef, useEffect, Fragment } from "react";
import { FixedSizeList as List } from "react-window";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

// Fallback avatar URL
const fallbackAvatar =
  "https://res.cloudinary.com/dukzrb2xm/image/upload/v1739074437/post_photos/px27jgawuthy1fhkfogd.png";

// Status border colors
const statusColors = {
  reviewing: "border-yellow-200",
  approved: "border-green-500",
  declined: "border-red-500",
  pending: "border-gray-300",
};

const AdoptionRequestsRow = ({
  requests,
  selectedRequest,
  setSelectedRequest,
  loading, // ✅ New prop for loading state
}) => {
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToItemCentered = (index) => {
    if (listRef.current && containerRef.current) {
      const itemSize = 80;
      const containerWidth = containerRef.current.offsetWidth;
      const totalItems = requests.length;
      const maxScrollLeft = totalItems * itemSize - containerWidth;
      let targetScrollLeft =
        index * itemSize - containerWidth / 2 + itemSize / 2;
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
      listRef.current.scrollTo(targetScrollLeft);
    }
  };

  // Skeleton loader for avatars
  const SkeletonRow = ({ style }) => (
    <div style={style} className="flex flex-col items-center shrink-0">
      <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>
      <p className="text-xs mt-1 bg-gray-200 h-4 w-16 rounded animate-pulse"></p>
    </div>
  );

  // Render each row in react-window list
  const Row = ({ index, style }) => {
    const req = requests[index];
    const profileImage = req.avatarUrl || fallbackAvatar;

    return (
      <div
        style={style}
        className="flex flex-col items-center cursor-pointer shrink-0"
        onClick={() => {
          setSelectedRequest(req);
          scrollToItemCentered(index);
        }}
      >
        <div
          className={`w-14 h-14 rounded-full border-4 flex items-center justify-center overflow-hidden ${
            selectedRequest?.id === req.id
              ? "border-altTagColor"
              : statusColors[req.status] || "border-gray-300"
          }`}
        >
          <img
            src={profileImage}
            alt={req.adopterName}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = fallbackAvatar)}
          />
        </div>
        <p className="text-xs mt-1">{req.adopterName}</p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="mb-2 w-full relative">
      {/* Header with title and "View All" dropdown */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Adoption Requests</h3>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="text-sm text-blue-300 underline focus:outline-none">
            View All
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white shadow-lg rounded-md border border-gray-200 z-50 h-80 overflow-y-auto">
              {loading
                ? [...Array(5)].map((_, idx) => (
                    <MenuItem key={idx}>
                      <div className="cursor-pointer p-2 flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                        <span className="text-sm bg-gray-200 h-4 w-16 rounded animate-pulse"></span>
                      </div>
                    </MenuItem>
                  ))
                : requests.map((req, idx) => (
                    <MenuItem key={req.id}>
                      {({ active }) => (
                        <div
                          onClick={() => {
                            setSelectedRequest(req);
                            scrollToItemCentered(idx);
                          }}
                          className={`cursor-pointer p-2 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <img
                              src={req.avatarUrl || fallbackAvatar}
                              alt={req.adopterName}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => (e.target.src = fallbackAvatar)}
                            />
                            <span className="text-sm">{req.adopterName}</span>
                          </div>
                        </div>
                      )}
                    </MenuItem>
                  ))}
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      {/* React-window list renders the avatars in a horizontally scrollable container */}
      {loading ? (
        <List
          ref={listRef}
          height={100}
          itemCount={5} // Show 5 skeletons
          itemSize={80}
          layout="horizontal"
          width={containerWidth}
        >
          {SkeletonRow}
        </List>
      ) : requests.length > 0 ? (
        <List
          ref={listRef}
          height={100}
          itemCount={requests.length}
          itemSize={80}
          layout="horizontal"
          width={containerWidth}
        >
          {Row}
        </List>
      ) : (
        <p className="text-center text-gray-500">No adoption requests yet.</p>
      )}
    </div>
  );
};

export default AdoptionRequestsRow;
