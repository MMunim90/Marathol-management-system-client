import React from "react";

const images = [
  "https://source.unsplash.com/featured/?marathon,1",
  "https://source.unsplash.com/featured/?marathon,2",
  "https://source.unsplash.com/featured/?marathon,3",
  "https://source.unsplash.com/featured/?marathon,4",
  "https://source.unsplash.com/featured/?marathon,5",
  "https://source.unsplash.com/featured/?marathon,6",
];

const Gallery = () => {
  return (
    <section className="py-16 bg-gray-400 text-center rounded-2xl">
      <h2 className="text-3xl font-bold text-white mb-8">Event Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 max-w-6xl mx-auto">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={src}
              alt={`Marathon ${i + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
