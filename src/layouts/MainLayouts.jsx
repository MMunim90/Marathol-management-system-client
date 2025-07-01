import React from "react";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { keyframes } from "@emotion/react";
import { Fade } from "react-awesome-reveal";
import Slider from "../components/Slider";

const MainLayouts = () => {
  const location = useLocation();
  const slightFadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar></Navbar>
      </div>
      {location.pathname === "/" && (
        <div>
          <Fade direction="down" keyframes={slightFadeDown}>
            <div className="">
              <Slider></Slider>
            </div>
          </Fade>
        </div>
      )}
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
