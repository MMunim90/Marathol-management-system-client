import React, { useEffect, useState } from "react";

const Upcomings = () => {
    const [upComingEvent, setUpcomingEvent] = useState([]);
    useEffect(() => {
        fetch('Upcomings.json')
        .then(res => res.json())
        .then((data) => {
        setUpcomingEvent(data);
      });
    }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md gap-6 justify-center">
      {upComingEvent.map((event, index) => (
        <div key={index} className="card border bg-base-100 w-auto shadow">
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">{event.title}</h2>
            <p>
              📅 {event.date}
              <br />
              📍 {event.location}
              <br />⏰ {event.time}
              <br />
              🏁 {event.distance}
              <br />
              💰 {event.fee}
              <br />
              {event.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Upcomings;
