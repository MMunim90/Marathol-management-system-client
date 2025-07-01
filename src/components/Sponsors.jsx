import React from "react";

const sponsors = [
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Garmin", logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/garmin-2-logo.png" },
  { name: "Red Bull", logo: "https://brandlogo.org/wp-content/uploads/2024/09/Red-Bull-Logo-1987.png.webp" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "New Balance", logo: "https://images.seeklogo.com/logo-png/9/1/new-balance-logo-png_seeklogo-98723.png" },
  { name: "ASICS", logo: "https://images.seeklogo.com/logo-png/49/1/asics-logo-png_seeklogo-499804.png" }
];


const Sponsors = () => {
  return (
    <section className="py-16 bg-gray-400 text-center rounded-2xl">
      <h2 className="text-3xl lg:text-5xl font-bold">Our Proud Sponsors</h2>
      <p className="text-center opacity-50 mb-8 p-3">Meet Our Proud Sponsors Powering Every Step – Trusted Brands Supporting Runners, Endurance, and the Spirit of Every Marathon Journey
</p>
      <div className="flex flex-wrap justify-center items-center gap-8 px-4">
        {sponsors.map((sponsor, i) => (
          <div
            key={i}
            className="w-32 h-20 flex items-center justify-center bg-white p-2 rounded-md grayscale hover:grayscale-0 transition duration-300 shadow-md"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
