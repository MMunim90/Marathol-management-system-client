import React from "react";

const images = [
  "https://jerseycitymarathon.com/wp-content/uploads/2025/04/gallery13.jpg",
  "https://melbournemarathon.com.au/wp-content/uploads/2023/01/221002_MelbMara22_IMGEvents_1570.jpg",
  "https://www.couturing.com/wp/wp-content/uploads/2021/10/Melb-Mara71.jpg",
  "https://run2.au/wp-content/uploads/2025/01/230918100849-02-sydney-marathon-heatwave-australia-climate.webp",
  "https://melbournemarathon.com.au/wp-content/gallery/2018-gallery/MG_4760-2.jpg",
  "https://melbournemarathon.com.au/wp-content/gallery/2018-gallery/5D1_0386.jpg",
];

const Gallery = () => {
  return (
    <section className="py-16 bg-gray-400 text-center rounded-2xl border-10 border-black">
      <h2 className="text-3xl font-bold lg:text-5xl mb-8">Event Highlights</h2>
      <div className="flex justify-between items-center">
        <div className="hidden lg:block">
            <img className="w-[600px] h-[400px] pl-10 object-cover hover:scale-105 transition duration-300 rounded-2xl" src="https://destiny2sport.com/wp-content/uploads/2025/02/Cape-Town-Marathon-Oct-2024-%C2%A9Mark-Sampson-21-scaled.webp" alt="" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 max-w-6xl mx-auto">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-md">
            <img src={src}
              alt={`Marathon ${i + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Gallery;
