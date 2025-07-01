import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const PerticipantsSay = () => {
    const [perticipants, setPerticipants] = useState([])

    useEffect(() => {
            fetch('Perticipants.json')
            .then(res => res.json())
            .then((data) => {
            setPerticipants(data);
          });
        }, [])
    return (
        <div className="w-full mx-auto p-1 my-10 border bg-gray-500 rounded-2xl">

  <Swiper
    modules={[Pagination, Navigation, Autoplay]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    loop={perticipants.length > 1}
    className="rounded-lg shadow-lg border bg-gradient-to-br from-white to-gray-100"
  >
    {perticipants.map((perticipant) => (
      <SwiperSlide key={perticipant.id}>
        <div className="bg-gray-400 rounded-xl shadow-md p-6 md:flex md:items-center md:gap-8 border border-gray-200">
          <div className="relative w-fit mx-auto md:mx-0">
            <img
              src={perticipant.photo}
              alt={perticipant.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cyan-700 text-white text-xs px-4 py-0.5 rounded-xl shadow-sm">
              {perticipant.position}
            </div>
          </div>

          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">{perticipant.name}</h3>
            <p className="text-cyan-600 text-sm font-medium mb-2">{perticipant.marathonName}</p>
            <p className="text-gray-700 text-base italic">"{perticipant.quote}"</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    );
};

export default PerticipantsSay;