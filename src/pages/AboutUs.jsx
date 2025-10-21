import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaBullseye, FaRegLightbulb, FaRunning, FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How can I register for a marathon?",
    answer: "You can register through our platform by selecting an event and filling out the registration form with your details."
  },
  {
    question: "Can I cancel my registration?",
    answer: "Yes, cancellations are allowed up to a specific date before the event. Please check the individual marathon details."
  },
  {
    question: "Are there different distance categories?",
    answer: "Yes, most events offer multiple categories such as 5K, 10K, Half Marathon, and Full Marathon."
  },
  {
    question: "How can I contact the organizers?",
    answer: "You can contact organizers directly via the contact information provided on each marathon’s detail page."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Currently, we do not have a mobile app, but our website is fully responsive and works seamlessly on mobile devices."
  }
];


const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-400 px-6 min-h-screen my-10 rounded-2xl flex flex-col items-center">
      <Helmet>
        <title>About Us | Marathon Management</title>
      </Helmet>

      <div className="max-w-5xl text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">About Us</h2>
        <p className="text-lg lg:text-xl leading-relaxed mb-8">
          Welcome to our Marathon Management Platform — your all-in-one solution for organizing, registering, and tracking marathon events. Whether you're a runner, sponsor, or organizer, we provide tools to make every race seamless and unforgettable.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mt-10">
          {/* Mission */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 border-3">
            <FaBullseye className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To empower athletes and organizers by providing an efficient platform to manage and promote marathon events.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 border-3">
            <FaRegLightbulb className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
            <p>
              Online registration, real-time updates, event promotion, sponsor management, and participant engagement — all in one place.
            </p>
          </div>

          {/* Join the Run */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 border-3">
            <FaRunning className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join the Run</h3>
            <p>
              Become part of a growing community of runners and event organizers working together to celebrate endurance and passion.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto text-left w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-3 text-left text-lg font-medium focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <p className="py-2 text-gray-800">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;