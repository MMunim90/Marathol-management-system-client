import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center bg-white p-16 min-h-screen">
      <img src="https://i.ibb.co/v4THdMnz/404.gif" alt="" />
      <h1 className="text-red-600 font-bold text-4xl mb-4">{error?.status}</h1>
      <p className="mb-5 text-xl font-bold text-red-600 md:text-2xl">
        {error?.error?.message || "Something Went Wrong!"}
      </p>
      <button className="btn font-bold text-xl py-6 text-center mt-6">
        <FaArrowLeftLong className="inline" /> &nbsp;
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
