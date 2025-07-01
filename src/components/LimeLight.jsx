import React from "react";

const LimeLight = () => {
  const openModal = (Id) => {
  const modal = document.getElementById(Id);
  if (modal) modal.showModal();
};

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Card 1 */}
      <div className="border rounded-2xl">
        <div className="card">
          <figure>
            <img
            className="rounded-t-2xl"
              src="https://i.ibb.co/bMtDWBvJ/lime1.jpg"
              alt="marathon"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Dove presents ActivePulse Women's Run 2025
            </h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => openModal("modal1")}
              >
                Event Detail
              </button>
            </div>
          </div>
        </div>

        {/* Modal (place outside card to avoid layout issues) */}
        <dialog id="modal1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Dove presents ActivePulse Women's Run 2025
            </h3>
            <p className="py-4">
              Dove presents ActivePulse Women’s Run 2025 is a celebration of
              women’s strength and unity, taking place at Hatirjheel, Dhaka on
              May 30, 2025. With 7.5K and 2K run categories, the event welcomes
              runners of all levels. Participants receive medals, T-shirts, race
              bibs, and refreshments. The event promotes fitness, empowerment,
              and community spirit, encouraging women to go beyond limits and
              embrace the joy of running together in a supportive environment.
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      </div>

      {/* card 2 */}
      <div className="md:w-full">
        <div className="card bg-base-100 shadow-sm border rounded-2xl">
          <figure>
            <img
              src="https://i.ibb.co/6Jrwj2RB/lime2.png"
              alt="marathon"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              MLA '25 Spotlight: Pittsburgh Marathon - MLA
            </h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => openModal("modal2")}
              >
                Event Detail
              </button>
            </div>
          </div>
        </div>

        {/* Modal (place outside card to avoid layout issues) */}
        <dialog id="modal2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              MLA '25 Spotlight: Pittsburgh Marathon - MLA
            </h3>
            <p className="py-4">
              The MLA ’25 Spotlight highlights the Pittsburgh Marathon as a memorable event during the conference. Scheduled for May 2–4, 2025, it offers a scenic and challenging route through 16 neighborhoods with great community support. In addition to the full marathon, there are inclusive events like a 5K, kids’ marathon, pet walk, and relay race. It’s a perfect opportunity for attendees to engage in fitness and experience the city’s vibrant spirit.

            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default LimeLight;
