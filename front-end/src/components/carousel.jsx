import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1016/800/400",
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1020/800/400",
];

export default function Carousel() {
  return (
    <div className="w-200 mx-auto mt-50 mr-150">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
