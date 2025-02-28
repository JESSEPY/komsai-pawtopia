import React from "react";

const ImagePreviewGrid = ({ mediaUrls }) => {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {mediaUrls.map((url, index) => (
        <div
          key={index}
          className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300"
        >
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
