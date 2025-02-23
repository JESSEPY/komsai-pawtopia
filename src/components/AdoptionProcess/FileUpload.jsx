import React, { useRef, useState } from "react";
import ImageGrid from "../ListAPet/ImageGrid";

const FileUpload = ({ label, privacyMessage, onFilesChange }) => {
  const fileInputRef = useRef(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
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
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    const newFiles = [...mediaFiles, ...validFiles].slice(0, 7); // Limit to 7 files
    setMediaFiles(newFiles);
    // Pass the new files to the parent component via the callback
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  return (
    <div className="mt-1 md:col-span-10">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="text-sm text-gray-600 mb-2">{privacyMessage}</div>

      <div
        className={`relative w-full mt-3 border h-40 ${
          dragging ? "border-blue-500" : "border-gray-400"
        } rounded-xl shadow-sm p-4 cursor-pointer bg-formBg`}
        onClick={handleBrowseClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center h-full">
          <button
            type="button"
            className="border-2 bg-white border-gray-200 text-gray-400 shadow-sm text-sm py-2 px-4 rounded-lg mb-2"
          >
            Upload Media
          </button>
          <p className="text-gray-400">Supports images & videos (Max: 7)</p>
        </div>
      </div>

      {/* ImageGrid to display selected files */}
      {mediaFiles.length > 0 && (
        <ImageGrid mediaFiles={mediaFiles} onRemoveFile={handleRemoveFile} />
      )}
    </div>
  );
};

export default FileUpload;
