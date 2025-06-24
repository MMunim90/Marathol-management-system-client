import React from "react";
import Slider from "../components/Slider";
import { useLoaderData } from "react-router";
import AdCard from "../components/AdCard";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Helmet } from "react-helmet-async";
import Upcomings from "../components/Upcomings";
import PerticipantsSay from "../components/PerticipantsSay";
import LimeLight from "../components/LimeLight";

const Home = () => {
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
  const allAds = useLoaderData();
  //   console.log(allAds);
  return (
    <div className="space-y-6 my-6">
      <Helmet>
        <title>Home | Runfinity</title>
      </Helmet>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="">
          <Slider></Slider>
        </div>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <h1 className="font-bold text-3xl lg:text-5xl text-center my-10">
          Marathons
        </h1>
        <p className="text-center opacity-50">Explore completed marathon highlights, winners, memorable runs, and community celebrations from past events.</p>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {allAds
            .map((marathon) => (
              <AdCard key={marathon._id} marathon={marathon}></AdCard>
            ))}
        </div>
      </Fade>

      <Fade direction="down" keyframes={slightFadeDown}>
        <h1 className="font-bold text-3xl lg:text-5xl text-center my-10">
          Upcoming Marathons
        </h1>
        <p className="text-center opacity-50">Discover thrilling upcoming marathon events across Bangladesh with key dates, locations, and distances.</p>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="text-center flex justify-center">
          <Upcomings></Upcomings>
        </div>
      </Fade>

      <Fade direction="down" keyframes={slightFadeDown}>
        <h1 className="font-bold text-3xl lg:text-5xl text-center my-10">
          In The Limelight
        </h1>
        <p className="text-center opacity-50">Showcasing standout runners, unforgettable moments, and inspiring achievements from every marathon.</p>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div>
          <LimeLight></LimeLight>
        </div>
      </Fade>

      <Fade direction="down" keyframes={slightFadeDown}>
        <h1 className="font-bold text-3xl lg:text-5xl text-center my-10">
          Participant Say
        </h1>
        <p className="text-center opacity-50">Hear inspiring words from our runners sharing their marathon experiences, motivation, and race-day moments.</p>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div>
          <PerticipantsSay></PerticipantsSay>
        </div>
      </Fade>
    </div>
  );
};

export default Home;
