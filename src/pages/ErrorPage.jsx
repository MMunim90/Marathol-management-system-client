import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-11/12 flex flex-col justify-center items-center">
    <img src="https://i.ibb.co/v4THdMnz/404.gif" alt="" />
    <button className="btn font-bold text-xl py-6 text-center">
        <FaArrowLeftLong className="inline" /> &nbsp;
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
