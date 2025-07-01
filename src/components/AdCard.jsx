import React from "react";
import { FaLocationDot, FaDoorOpen } from "react-icons/fa6";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const AdCard = ({ marathon }) => {
  const { title, image, location, description, _id, registrationStart, registrationEnd } = marathon;
  const tooltipId = `tooltip-${_id}`;

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
    <div className="max-w-[600px] h-full flex flex-col rounded-2xl shadow-lg bg-gray-400 overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2">
      <img data-tooltip-id={tooltipId} className="w-full h-56 object-cover" src={image} alt='' />
      <Tooltip className="z-10" id={tooltipId}>
        <div className="w-80 h-70 text-2xl">
          {description}
        </div>
      </Tooltip>

      {/* Content Wrapper */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {isRegistrationOpen && <FaDoorOpen size={30} />}
        </div>

        <p className="text-lg mb-2">
          <FaLocationDot className="inline mr-2" /> {location}
        </p>

        <div className="mb-4 text-md">
          <p>
            <span className="font-semibold">Registration:</span>{" "}
            {formatDate(registrationStart)} - {formatDate(registrationEnd)}
          </p>
        </div>

        {/* Stick Button to Bottom */}
        <div className="mt-auto">
          <Link
            to={`/marathonDetail/${_id}`}
            className="block w-full text-white cursor-pointer py-2 rounded-xl bg-black text-center text-2xl"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
