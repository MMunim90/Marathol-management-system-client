import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../custom_hook/useAuth";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Loading from "../components/Loading";

const MarathonList = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/marathons?sort=${sortOrder}&email=${user.email}`, {
        headers: {
            authorization: `Bearer ${user.accessToken}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .catch((err) => console.error(err));
  }, [sortOrder, user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This marathon will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/marathons/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMarathons((prev) =>
                prev.filter((marathon) => marathon._id !== id)
              );
              Swal.fire(
                "Deleted!",
                "Your marathon has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleEdit = (marathon) => {
    setSelectedMarathon(marathon);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const startDate = form.startDate.value;
    const distance = form.distance.value;
    const description = form.description.value;
    const registrationStart = form.regStart.value;
    const registrationEnd = form.regEnd.value;
    const image = form.image.value;

    const updatedMarathon = {
      title,
      location,
      startDate,
      distance,
      description,
      registrationStart,
      registrationEnd,
      image,
    };

    fetch(`${import.meta.env.VITE_API_URL}/marathons/${selectedMarathon._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMarathon),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setMarathons((prevMarathon) =>
            prevMarathon.map((marathon) =>
              marathon._id === selectedMarathon._id
                ? { ...marathon, ...updatedMarathon }
                : marathon
            )
          );
          Swal.fire(
            "Marathon Updated!",
            "Your marathon has been updeted.",
            "success"
          );
          setIsModalOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Runfinity | Marathon List</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">Marathon Lists</h2>
      <div className="sort-controls flex items-center space-x-4 mb-6 ">
        <label htmlFor="sortOrder" className="text-2xl font-semibold">
          Sort By:
        </label>
        <select
          onChange={handleSortChange}
          className="border rounded-lg shadow-sm focus:ring-2 px-4 py-2"
        >
          <option className="text-black" value="desc">
            Oldest
          </option>
          <option className="text-black" value="asc">
            Newest
          </option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border shadow-lg">
          <thead className="bg-gray-400 text-black">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {marathons.length > 0 ? (
              marathons.map((marathon, index) => (
                <tr key={marathon._id}>
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{marathon.title}</td>
                  <td className="py-3 px-4">{marathon.location}</td>
                  <td className="py-3 px-4">
                    {formatDate(marathon.startDate)}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(marathon)}
                      className="btn btn-sm flex items-center gap-1"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-lg">
                  {localLoading ? (
                    <Loading />
                  ) : (
                    "Did not Added Any Marathon Yet."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMarathon && (
        <dialog open className="modal">
          <div className="modal-box max-w-4xl p-6">
            <div className="flex justify-between gap-6 mb-6">
              <h3 className="font-bold text-2xl mb-6 text-center">
                Update Marathon
              </h3>
              <h3
                onClick={() => setIsModalOpen(false)}
                className="text-xl mb-6 text-end cursor-pointer"
              >
                X
              </h3>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <label>
                  Title
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedMarathon.title}
                    className="input input-bordered w-full"
                    placeholder="Title"
                    required
                    readOnly
                  />
                </label>

                <label>
                  Location
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedMarathon.location}
                    className="input input-bordered w-full"
                    placeholder="Location"
                    required
                  />
                </label>
                <label>
                  Registration Start
                  <input
                    type="date"
                    name="regStart"
                    defaultValue={
                      new Date(selectedMarathon.registrationStart)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Registration End
                  <input
                    type="date"
                    name="regEnd"
                    defaultValue={
                      new Date(selectedMarathon.registrationEnd)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Marathon Start
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={
                      new Date(selectedMarathon.startDate)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Distance
                  <select
                    name="distance"
                    className="input input-bordered w-full"
                    defaultValue={selectedMarathon.distance}
                    required
                  >
                    <option value="3k">3k</option>
                    <option value="5k">5k</option>
                    <option value="10k">10k</option>
                    <option value="15k">15k</option>
                    <option value="25k">25k</option>
                  </select>
                </label>

                <label>
                  {" "}
                  Description
                  <textarea
                    name="description"
                    defaultValue={selectedMarathon.description}
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    required
                  ></textarea>
                </label>

                <label>
                  Image URL
                  <input
                    type="url"
                    name="image"
                    defaultValue={selectedMarathon.image}
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                    required
                  />
                </label>
              </div>

              <div className="modal-action flex justify-end mt-6">
                <button
                  type="submit"
                  className="btn px-6 text-black bg-white"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MarathonList;
