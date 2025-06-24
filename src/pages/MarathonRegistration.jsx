import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import useAuth from "../custom_hook/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";

const MarathonRegistration = () => {
  const marathon = useLoaderData();
  const { user } = useAuth();
  const {
    _id,
    title,
    startDate,
    location,
    image,
    description,
  } = marathon;
  const navigate = useNavigate();

  const handleRegistration = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const additionalInfo = form.additionalInfo.value;
    const email = form.email.value;

    const marathonApplication = {
      title,
      startDate,
      location,
      image,
      description,
      firstName,
      lastName,
      phoneNumber,
      additionalInfo,
      email: email,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/marathonApplication`, marathonApplication)
      .then((res) => {
        fetch(
          `${import.meta.env.VITE_API_URL}/marathons/${_id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(marathon),
          }
        );
        if (res.data.insertedId) {
          Swal.fire({
            title: "Registration Successfull!",
            icon: "success",
            draggable: true,
          });

          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return (
    <div>
      <Helmet>
        <title>Marathon Registration</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="shadow-xl overflow-hidden w-11/12 mx-auto mt-6">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl md:text-6xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <h2 className=" text-2xl md:text-5xl font-bold mb-4">
            Marathon Registration Form
          </h2>
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold">
                  Marathon Title
                </label>
                <input
                  type="text"
                  value={title}
                  readOnly
                  className="w-full mt-2 p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Start Date
                </label>
                <input
                  type="text"
                  value={formatDate(startDate)}
                  readOnly
                  className="w-full mt-2 p-3 border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  required
                  className="w-full mt-2 p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  required
                  className="w-full mt-2 p-3 border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold">
                  Contact Number
                </label>
                <input
                  type="number"
                  placeholder="Contact Number"
                  name="phoneNumber"
                  required
                  className="w-full mt-2 p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={user?.email}
                  name="email"
                  className="w-full mt-2 p-3 border rounded-md"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Additional Info
              </label>
              <textarea
                placeholder="Any additional information"
                name="additionalInfo"
                className="w-full mt-2 p-3 border rounded-md"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="btn text-lg border-2 mr-2">
                Apply
              </button>

              <Link onClick={() => navigate(-1)} className="btn text-lg text-black bg-white border-2">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarathonRegistration;
