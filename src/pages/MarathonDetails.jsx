import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FaLocationDot } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { AuthContext } from "../Provider/AuthProvider";
import { MdTipsAndUpdates } from "react-icons/md";

const MarathonDetails = () => {
  const allMarathon = useLoaderData();
  const navigate = useNavigate();
  const {
    _id,
    title,
    location,
    registrationStart,
    registrationEnd,
    startDate,
    distance,
    description,
    image,
    registrationCount,
  } = allMarathon;

  const regStart = new Date(registrationStart);
  const regEnd = new Date(registrationEnd);
  const eventDate = new Date(startDate);
  const currentDate = new Date();

  const isRegistrationOpen = currentDate >= regStart && currentDate <= regEnd;

  const timeLeft = Math.max((eventDate - currentDate) / 1000, 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return (
    <div className="card lg:card-side bg-gray-400 shadow-sm my-6">
      <Helmet>
        <title>Detail | Runfinity</title>
      </Helmet>
      <figure className="md:w-[500px]">
        <img src={image} alt="Album" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-3xl text-black">{title}</h2>
          <Link to='/tips' className="text-black cursor-pointer">{isRegistrationOpen ? <MdTipsAndUpdates size={30} /> : ""}</Link>
        </div>
        <p className="text-black">
          <FaLocationDot className="inline mr-2" />
          {location}
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="text-xl text-black">
            <h1>
              <span className="font-bold">Registration :</span>{" "}
            </h1>
            <p>
              <span className="font-bold">Registration Start : </span>{" "}
              {formatDate(registrationStart)}
            </p>
            <p>
              <span className="font-bold">Registration End : </span>{" "}
              {formatDate(registrationEnd)}
            </p>
            <p>
              <span className="font-bold">Event Date : </span>{" "}
              {formatDate(startDate)}
            </p>
            <p className="text-xl">
              <span className="font-bold">Distance : </span>
              {distance}
            </p>
            <p className="text-lg">
              <span className="font-bold">Event Detail : </span>
              {description}
            </p>
          </div>

          <div>
            <div>
              {/* Countdown Timer */}
              <div className="flex justify-center">
                <div className="p-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                    Time Left
                  </h2>
                  <CountdownCircleTimer
                    isPlaying
                    duration={timeLeft}
                    colors={["#000000", "#e0e0e0", "#FF5733"]}
                    size={150}
                    strokeWidth={5}
                    trailColor="#e0e0e0"
                    onComplete={() => ({ shouldRepeat: false })}
                  >
                    {({ remainingTime }) => {
                      const days = Math.floor(remainingTime / 86400);
                      const hours = Math.floor((remainingTime % 86400) / 3600);
                      const minutes = Math.floor((remainingTime % 3600) / 60);
                      const seconds = remainingTime % 60;

                      return (
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            {days}d {hours}h
                          </p>
                          <p className="text-xl text-gray-600 text-center">
                            {minutes}m {seconds}s
                          </p>
                        </div>
                      );
                    }}
                  </CountdownCircleTimer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black text-white p-8  shadow-lg text-center">
          <h2 className="text-4xl font-semibold mb-2">{registrationCount.length}</h2>
          <p className="text-xl">Registered Participants</p>
        </div>
        <div className="card-actions justify-end">
          {isRegistrationOpen ? (
            <Link
              to={`/marathon/registration/${_id}`}
              className="btn btn-outline text-lg border-2"
            >
              Register
            </Link>
          ) : (
            <button
              disabled
              className="btn btn-outline text-lg border-2 cursor-not-allowed"
            >
              Registration Closed
            </button>
          )}
          <Link onClick={() => navigate(-1)} className="btn text-lg border-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
