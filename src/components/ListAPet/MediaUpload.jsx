import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageSlider from "./ImageSlider";
import ImageGrid from "./ImageGrid";

const FileUpload = ({ label, privacyMessage, mediaFiles, setMediaFiles }) => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Store File objects instead of file names
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index, e) => {
    e.stopPropagation();
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-1 md:col-span-10">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="text-sm text-gray-600 mb-2">{privacyMessage}</div>

      <div
        className={`relative w-full mt-3 border h-48 ${
          dragging ? "border-blue-500" : "border border-listInputBorder"
        } rounded-xl shadow-sm p-4 cursor-pointer bg-sidebarBg`}
        onClick={handleBrowseClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center h-full">
          <button
            type="button"
            className="border-2 bg-white border-gray-300 text-gray-400 shadow-md text-sm py-2 px-4 rounded-lg mb-2"
          >
            Upload a New Media
          </button>
          <p className="text-gray-400">Accepting 5 PNGs only</p>
        </div>
      </div>

      {/* Selected Images */}

      {mediaFiles.length > 0 && (
        <div className="mt-2">
          <ImageGrid
            mediaFiles={mediaFiles}
            onRemoveFile={(index) =>
              setMediaFiles((prevFiles) =>
                prevFiles.filter((_, i) => i !== index)
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
