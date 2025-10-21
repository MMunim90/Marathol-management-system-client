import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // icon (lucide-react)

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // show button when scroll > 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-28 right-3 md:bottom-6 md:right-6 p-2 md:p-3 rounded-full bg-gray-600 text-white shadow-lg hover:bg-gray-700 transition cursor-pointer mb-14"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;