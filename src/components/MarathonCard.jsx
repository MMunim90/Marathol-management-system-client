import React from "react";
import { Link } from "react-router";
import Loading from "./Loading";
import { FaDoorOpen, FaLocationDot } from "react-icons/fa6";

const MarathonCard = ({ marathon }) => {
  const { _id, title, registrationStart, registrationEnd, location, image } =
    marathon;

  const regStart = new Date(registrationStart);
  const regEnd = new Date(registrationEnd);
  const currentDate = new Date();

  const isRegistrationOpen = currentDate >= regStart && currentDate <= regEnd;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return (
    <div>
      <div className="bg-gray-400 shadow-lg rounded-2xl border-2 flex flex-col h-full space-y-2">
        <div>
          <img
            src={image}
            alt=""
            className="rounded-t-2xl h-56 w-full object-cover"
          />
        </div>
        <div className="flex justify-between items-center px-3">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div>{isRegistrationOpen ? <FaDoorOpen size={30} /> : ""}</div>
        </div>
        <p className="px-3 font-medium text-md">
          <FaLocationDot className="inline mr-2" />
          {location}
        </p>

        <div className="px-3 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Registration:</span>{" "}
            {formatDate(registrationStart)} - {formatDate(registrationEnd)}
          </p>
        </div>

        <div className="mt-auto pt-4 p-3 ">
          <Link
            to={`/marathonDetail/${_id}`}
            className="block w-full text-center py-2 text-white bg-black font-bold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonCard;
