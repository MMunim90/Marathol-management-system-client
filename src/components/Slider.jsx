import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      effect="fade"
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 20000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div
          className="relative w-full h-[220px] md:h-[400px] lg:h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.ibb.co/S4ZrR1VH/cover3.jpg')",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center z-10">
              <span className="font-bold text-3xl md:text-5xl lg:text-7xl">
                <Typewriter
                  words={["Unity", "Shines", "at", "Dhaka", "Marathon"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </span>
              <br />
              Dhaka Int'l Marathon held with call for unity, friendship and
              respect for diversity
              <br />
              <Link
                to="https://dhakainternationalmarathon.org/"
                target="_blank"
                className="btn mt-4 text-2xl px-8"
              >
                More
              </Link>
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="relative w-full h-[220px] md:h-[400px] lg:h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.ibb.co/Cp4kVK3L/cover2.png')",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center z-10">
              <span className="font-bold text-3xl md:text-5xl lg:text-7xl">
                <Typewriter
                  words={["Inspiring", "Run", "Bangladesh", "2024"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </span>
              <br />
              Inspiring Bangladesh Run 2024 | Marathon <br />
              <Link
                to="https://youtu.be/_Iq280AqdiQ?feature=shared"
                target="_blank"
                className="btn mt-4 text-2xl px-8"
              >
                More
              </Link>
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="relative w-full h-[220px] md:h-[400px] lg:h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.ibb.co/dw0rNzF7/cover1.jpg')",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center z-10">
              <span className="font-bold text-3xl md:text-5xl lg:text-7xl">
                <Typewriter
                  words={[
                    "Dhaka",
                    "Marathon",
                    "2025",
                    "Set",
                    "to",
                    "Break",
                    "Records",
                  ]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </span>
              <br />
              Dhaka International Marathon-2025 set for tomorrow with record
              participation
              <br />
              <Link
                to="https://www.tbsnews.net/events/dhaka-international-marathon-2025-set-tomorrow-record-participation-1063396"
                target="_blank"
                className="btn mt-4 text-2xl px-8"
              >
                More
              </Link>
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="relative w-full h-[220px] md:h-[400px] lg:h-[700px] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.dailymail.co.uk/1s/2025/04/27/10/1745747000766_lc_galleryImage_Marcel_Hug_crosses_the_fi.JPG')",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center z-10">
              <span className="font-bold text-3xl md:text-5xl lg:text-7xl">
                <Typewriter
                  words={["Mens", "elite", "wheelchair", "race"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </span>
              <br />
              Switzerland's Marcel Hug broke the finish line as he becomes the
              first winner - of the men's elite wheelchair race.
              <br />
              <Link
                to="https://www.boston.com/sports/boston-marathon/2025/04/21/marcel-hug-wins-2025-boston-marathon-mens-wheelchair-division/"
                target="_blank"
                className="btn mt-4 text-2xl px-8"
              >
                More
              </Link>
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
