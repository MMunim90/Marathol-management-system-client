import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const images = [
  {
    src: "https://jerseycitymarathon.com/wp-content/uploads/2025/04/gallery13.jpg",
    detail: "Jersey City Marathon 2025 – Energetic crowd and vibrant atmosphere."
  },
  {
    src: "https://melbournemarathon.com.au/wp-content/uploads/2022/10/221002_MelbMara22_IMGEvents_2313-scaled-1.jpg",
    detail: "Melbourne Marathon 2023 – Capturing peak moments near the finish line."
  },
  {
    src: "https://www.couturing.com/wp/wp-content/uploads/2021/10/Melb-Mara71.jpg",
    detail: "Melbourne Marathon 2021 – Runners showcasing endurance and teamwork."
  },
  {
    src: "https://run2.au/wp-content/uploads/2025/01/230918100849-02-sydney-marathon-heatwave-australia-climate.webp",
    detail: "Sydney Marathon 2025 – Racing under intense heat conditions."
  },
  {
    src: "https://runningmagazine.ca/wp-content/uploads/2017/01/NYCM16_DG_296.jpg",
    detail: "Melbourne 2018 – Mid-race action moment."
  },
  {
    src: "https://images.7news.com.au/publication/C-16384727/6327ea01900cfafc39751cdfd7dcd76410284097.jpg?imwidth=650&impolicy=sevennews_v2",
    detail: "Runners pacing through the final stretch in Melbourne 2018."
  },
];

const Gallery = () => {
  const [selectedDetail, setSelectedDetail] = useState("");

  const handleInfoClick = (detail) => {
    setSelectedDetail(detail);
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <section className="py-16 bg-gray-400 text-center rounded-2xl border-10 border-black">
      <h2 className="text-3xl font-bold lg:text-5xl mb-8">Event Highlights</h2>
      <div className="flex justify-between items-center">
        <div className="hidden lg:block">
          <img
            className="w-[600px] h-[400px] pl-10 object-cover hover:scale-105 transition duration-300 rounded-2xl"
            src="https://destiny2sport.com/wp-content/uploads/2025/02/Cape-Town-Marathon-Oct-2024-%C2%A9Mark-Sampson-21-scaled.webp"
            alt="Side Marathon Highlight"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg shadow-md group">
              <img
                src={img.src}
                alt={`Marathon ${i + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
              />
              <button
                onClick={() => handleInfoClick(img.detail)}
                className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                title="View Details"
              >
                <FaInfoCircle className="text-gray-800" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <p className="py-2">{selectedDetail}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
};

export default Gallery;