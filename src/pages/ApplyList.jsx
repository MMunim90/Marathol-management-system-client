import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../custom_hook/useAuth";
import Loading from "../components/Loading";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ApplyList = () => {
  const { user } = useAuth();
  const [appliedMarathon, setAppliedMarathon] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/marathonApplication?email=${user.email}`, {
        headers: {
            authorization: `Bearer ${user.accessToken}`
        }
      })
      .then((res) => res.json())
      .then((data) => setAppliedMarathon(data));
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are You Sure Want To Delete?",
      text: "The Application Will Delete Parmanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/marathonApplication/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remainingMarathon = appliedMarathon.filter(
                (marathon) => marathon._id !== id
              );
              setAppliedMarathon(remainingMarathon);
              Swal.fire(
                "Deleted!",
                "The Application Has Been Deleted!.",
                "success"
              );
            }
          });
      }
    });
  };

  const handleEdit = (marathon) => {
    setSelectedMarathon(marathon);
    setIsModalOpen(true);
  };

  const handleUpdateMarathon = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const startDate = form.startDate.value;
    const location = form.location.value;
    const description = form.description.value;
    const additionalInfo = form.additionalInfo.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const image = form.image.value;
    const updateAbleData = {
      firstName,
      lastName,
      title,
      startDate,
      phoneNumber,
      location,
      description,
      additionalInfo,
      image,
    };

    fetch(`${import.meta.env.VITE_API_URL}/marathonApplication/${selectedMarathon._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAbleData),
    })
      .then((res) => {
        if (res.status === 200) {
          setAppliedMarathon((prevMarathons) =>
            prevMarathons.map((marathon) =>
              marathon._id === selectedMarathon._id
                ? { ...marathon, ...updateAbleData }
                : marathon
            )
          );
          Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((err) => {
         console.log(err);
      });
  };

  // search by marathon title
  const filteredMarathons = appliedMarathon.filter((marathon) =>
    marathon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <title>Runfinity | Application Lists</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">Application Lists</h2>
      <div className="overflow-x-auto">
        <div className="mb-6 mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Search by Marathon Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full sm:w-1/2"
          />
        </div>
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
            {filteredMarathons.length > 0 ? (
              filteredMarathons.map((marathon, index) => (
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
                      className="btn btn-sm btn-error flex gap-1 items-center"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-lg">
                  {localLoading ? <Loading /> : "Application Lists is empty"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between gap-6 mb-6">
              <h3 className="font-bold text-2xl mb-6 text-center">
                Edit Marathon Application
              </h3>
              <h3 onClick={() => setIsModalOpen(false)} className="text-xl mb-6 text-end cursor-pointer">
                X
              </h3>
            </div>
            <form onSubmit={handleUpdateMarathon} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedMarathon?.title}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={
                      new Date(selectedMarathon?.startDate)
                        .toISOString()
                        .split("T")[0] //ChatGPT Helped Me to do that.
                    }
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={selectedMarathon?.firstName}
                    className="input input-bordered w-full"
                    placeholder="firstName"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={selectedMarathon?.lastName}
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedMarathon?.location}
                    className="input input-bordered w-full"
                    placeholder="Marathon Location"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    defaultValue={selectedMarathon?.phoneNumber}
                    className="input input-bordered w-full"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedMarathon?.description}
                    className="textarea textarea-bordered w-full"
                    placeholder="Marathon Description"
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Additional Info</label>
                  <textarea
                    name="additionalInfo"
                    defaultValue={selectedMarathon?.additionalInfo}
                    className="textarea textarea-bordered w-full"
                    placeholder="Any additional information"
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={selectedMarathon?.image}
                    className="input input-bordered w-full"
                    placeholder="Marathon Image URL"
                  />
                </div>
              </div>

              <div className="modal-action justify-end">
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

export default ApplyList;
