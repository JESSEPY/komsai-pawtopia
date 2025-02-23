import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // ✅ Updated import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImageSlider = ({ mediaFiles, onRemoveFile }) => {
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="w-full"
      modules={[Navigation, Pagination]} // ✅ Required in Swiper v11+
    >
      {mediaFiles.map((file, index) => {
        const imageURL = URL.createObjectURL(file);
        return (
          <SwiperSlide key={index} className="relative">
            <img
              src={imageURL}
              alt={file.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile(index);
              }}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
