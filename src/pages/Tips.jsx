import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const Tips = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  useEffect(() => {
    fetch("Tips.json")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
      });
  }, []);
  return (
    <div className="bg-gray-400 min-h-screen my-6">
      <Helmet>
        <title>Tips | Runfinity</title>
      </Helmet>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Marathon Preparation Tips 🏃‍♂️🏁
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {index + 1}. {tip.title}
              </h2>
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-black font-semibold text-2xl text-white rounded-lg mb-6 cursor-pointer"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default Tips;
