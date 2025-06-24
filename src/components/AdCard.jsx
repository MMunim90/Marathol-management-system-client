import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { FaDoorOpen } from "react-icons/fa6";

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
    <div className="max-w-[600px] rounded-2xl shadow-lg bg-gray-400 overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2">
      <img data-tooltip-id={tooltipId} className="w-full h-56 object-cover" src={image} alt='' />
      <Tooltip className="z-10" id={tooltipId}><div className="w-80 h-70 text-2xl">
        {description}
        </div></Tooltip>
      <div className="p-4 rounded-b-2xl bg-gray-400">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-1">{title}</h2>
          <div>
          {
            isRegistrationOpen ? <FaDoorOpen size={30}/> : ""
          }
        </div>
        </div>
        <p className="text-lg mb-2"><FaLocationDot className="inline mr-2"/>{location}</p>
        <div className="space-y-2 mb-4">
            <p className="text-md">
              <span className="font-semibold">Registration:</span>{" "}
              {formatDate(registrationStart)} - {formatDate(registrationEnd)}
            </p>
          </div>
        <div className="w-full text-white cursor-pointer py-2 rounded-xl bg-black text-center text-2xl">
          <Link to={`/marathonDetail/${_id}`}>See Details</Link> {/*to={`/news-details/${id}`}*/}
        </div>
      </div>
    </div>
  );
};

export default AdCard;
