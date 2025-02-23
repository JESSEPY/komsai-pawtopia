import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImageGrid = ({ mediaFiles, onRemoveFile }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
      {mediaFiles.map((file, index) => {
        const mediaURL = URL.createObjectURL(file);
        const isVideo = file.type.startsWith("video/");

        // Define a dynamic class for varied sizes
        const bentoClass =
          index % 7 === 0
            ? "col-span-2 row-span-2"
            : index % 5 === 0
            ? "col-span-2 row-span-1"
            : "col-span-1 row-span-1";

        return (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden ${bentoClass}`}
          >
            {isVideo ? (
              <video
                src={mediaURL}
                controls
                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <img
                src={mediaURL}
                alt={file.name}
                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile(index);
              }}
              className="absolute top-2 right-2 text-red-50 hover:text-red-600 transition duration-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
