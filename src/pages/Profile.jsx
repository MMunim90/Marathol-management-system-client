import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    updateUserProfile({
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photoURL });
        Swal.fire({
          title: "Great!",
          text: "You updated your profile successfully!",
          icon: "success",
        });
      })
      .catch((error) => {
        toast.error(error.message);
        setUser(user);
      });
  };

  return (
    <div className="w-full mx-auto">
      <Helmet>
        <title>Runfinity | Profile</title>
      </Helmet>

      {/* Cover photo */}
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')`,
        }}
      >
        {/* Profile photo */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
          <img
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-2xl font-bold">{user?.displayName || "Your Name"}</h1>
        <p className="text-gray-500">{user?.email}</p>

        {/* Social links */}
        {/* <div className="flex justify-center gap-4 mt-4 text-gray-500">
          <a href="#" className="hover:text-black">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-black">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-black">
            <i className="fab fa-instagram"></i>
          </a>
        </div> */}
      </div>

      {/* Update Profile Form */}
      <div className="w-11/12 md:w-1/2 mx-auto mt-10">
        <h2 className="font-bold text-2xl mb-4 text-center">Update Your Profile</h2>
        <form
          onSubmit={handleUpdateUser}
          className="bg-gray-100 p-6 rounded-2xl shadow"
        >
          <div className="mb-4 text-black">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4 text-black">
            <label className="block text-gray-600 mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              defaultValue={user?.photoURL}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
