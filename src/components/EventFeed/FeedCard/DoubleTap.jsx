import React, { useState } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const DoubleTap = ({
  children,
  onDoubleTap,
  animationDuration = 400,
  className,
}) => {
  const [lastTap, setLastTap] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap detected
      setShowHeart(true);

      // Show heart animation
      setTimeout(() => {
        setShowHeart(false);
        // Trigger the like action
        onDoubleTap && onDoubleTap();
      }, animationDuration);
    }
    setLastTap(now);
  };

  return (
    <div onClick={handleTap} className={`relative ${className}`}>
      {children}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SolidHeartIcon className="w-20 h-20 text-primary animate-ping" />
        </div>
      )}
    </div>
  );
};

export default DoubleTap;
