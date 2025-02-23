import React, { useEffect, useRef, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import DoubleTap from "./DoubleTap"; // adjust the path as needed

const InlineVideo = ({ media, onDoubleTap }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto play/pause based on visibility:
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* Wrap the video element in DoubleTap */}
      <DoubleTap onDoubleTap={onDoubleTap} className="w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full rounded object-cover"
          muted={isMuted}
          playsInline
          loop
          controls={false}
          // If you still want single-tap for play/pause:
          onClick={togglePlay}
        >
          <source src={media} type={`video/${media.split(".").pop()}`} />
          Your browser does not support the video tag.
        </video>
      </DoubleTap>
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full z-10"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="h-5 w-5 text-white" />
        ) : (
          <SpeakerWaveIcon className="h-5 w-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default InlineVideo;
