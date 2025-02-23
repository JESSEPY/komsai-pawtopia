import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InlineVideo from "./InlineVideo";
import InlineImage from "./InlineImage";

const FeedMediaSlider = ({ postMedia, onDoubleTap }) => {
  return (
    <div className="w-full max-w-[614px] mx-auto mt-2 overflow-hidden rounded-2xl bg-white flex flex-col justify-start mb-2 aspect-[4/5]">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="w-full h-full"
      >
        {postMedia.map((media, index) => (
          <SwiperSlide key={index}>
            {media.match(/\.(mp4|webm|ogg)$/i) ? (
              <InlineVideo media={media} onDoubleTap={onDoubleTap} />
            ) : (
              <InlineImage media={media} onDoubleTap={onDoubleTap} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedMediaSlider;
