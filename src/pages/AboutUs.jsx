import React from "react";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-400 px-6 min-h-screen my-10 rounded-2xl">
      <Helmet>
        <title>About Us | Marathon Management</title>
      </Helmet>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">About Us</h2>
        <p className="text-lg lg:text-xl leading-relaxed mb-8">
          Welcome to our Marathon Management Platform — your all-in-one solution for organizing, registering, and tracking marathon events. Whether you're a runner, sponsor, or organizer, we provide tools to make every race seamless and unforgettable.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mt-10">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To empower athletes and organizers by providing an efficient platform to manage and promote marathon events.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
            <p>
              Online registration, real-time updates, event promotion, sponsor management, and participant engagement — all in one place.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Join the Run</h3>
            <p>
              Become part of a growing community of runners and event organizers working together to celebrate endurance and passion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
