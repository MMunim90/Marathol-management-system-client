import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MarathonCard from '../components/MarathonCard';
import { Fade } from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const Marathon = () => {
    const [marathons, setMarathons] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/getMarathon?sort=${sortOrder}`
      )
      .then((res) => {
        setMarathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

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
    <div className="w-full mx-auto px-4 py-8">
      <Helmet>
        <title>Marathons | Runfinity</title>
      </Helmet>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="text-center mb-16 bg-gradient-to-r from-gray-400 to-gray-700  py-12 px-6 rounded-lg shadow-lg">
        <h2 className="text-5xl font-extrabold mb-4">
          Marathons Overview
        </h2>
        <p className="text-lg mb-4 opacity-70">
          Get exciting marathon event happening around the world.
        </p>
        <p className="text-sm opacity-50 max-w-3xl mx-auto">
          Whether you're a seasoned runner or just getting started, there's a
          marathon for everyone. Browse through a variety of marathons, from
          local events to global races. Find one that suits your passion and
          start preparing today!
        </p>
      </div>
      </Fade>
      <div className="mb-10">
        <label htmlFor="sortOrder" className="text-2xl font-semibold">
          Sort By :
        </label>
        <select
          onChange={handleSortChange}
          className="bg-white border border-black text-gray-700 rounded-lg shadow-sm focus:ring-2 ml-3 px-4 py-2 transition duration-200 hover:bg-gray-100"
        >
          <option value="desc">Oldest</option>
          <option value="asc">Newest</option>
        </select>
      </div>

        <Fade direction="down" keyframes={slightFadeDown}>
      {loading ? (
        <div className="flex justify-center items-center py0">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marathons.map((marathon) => (
            <MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>
          ))}
        </div>
      )}
      </Fade>
    </div>
    );
};

export default Marathon;