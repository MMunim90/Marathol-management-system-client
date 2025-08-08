import React, { use, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Lottie from "lottie-react";

import registerLottie from "../../src/assets/lotties/register.json";
import { Helmet } from "react-helmet-async";
import FadeIn from "react-fade-in";

const Register = () => {
  const { createUser, setUser, updateUserProfile, signInWithGoogle } =
    use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    if (!/^.{6,}$/.test(password)) {
      setPasswordError("Password must be minimum 6 characters long.");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("at least one lowercase.");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("at least one uppercase.");
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        Swal.fire({
          title: "Welcome!",
          text: "user created successfully!",
          icon: "success",
        });
        navigate("/");
        updateUserProfile({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
          })
          .catch((error) => {
            //console.log(error);
            toast.error(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        toast.error(errorMessage, errorCode);
      });
  };

  const handleGoogleSignIn = () => {
    // console.log("google sign in complete")
    signInWithGoogle()
      .then((result) => {
        // console.log(result)
        const user = result.user;
        navigate("/");
        Swal.fire({
          title: `${user.displayName} SignUp successful`,
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    if (passwordError) {
      Swal.fire({
        title: passwordError,
        icon: "error",
        draggable: true,
      }).then(() => {
        // Clear error after clicking OK
        setPasswordError(""); // You must define setPasswordError from useState
      });
    }
  }, [passwordError]);
  return (
    <div className="hero-content flex-col lg:flex-row w-full mx-auto">
      <Helmet>
        <title>Register | Runfinity</title>
      </Helmet>
      <div className="w-full lg:max-w-md p-8 space-y-3 rounded-xl mx-auto my-10 md:w-6/12 lg:w-full">
        <FadeIn>
          <h1 className="text-2xl md:text-4xl font-bold text-start mb-8">
            Register Now
          </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-1 text-sm">
              {/* <label htmlFor="username" className="block dark:text-gray-600">
                Username
              </label> */}
              <input
                type="text"
                name="name"
                id="username"
                placeholder="Username"
                required
                className="w-full px-4 py-3 rounded-md border-gray-400 border-3 bg-gray-50 text-gray-800"
              />
            </div>

            <div className="space-y-1 text-sm">
              {/* <label className="block text-gray-600">Email</label> */}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-md border-gray-400 border-3 bg-gray-50 text-gray-800"
              />
            </div>

            <div className="space-y-1 text-sm">
              {/* <label className="block text-gray-600">Photo URL</label> */}
              <input
                type="text"
                name="photoURL"
                id="photoURL"
                placeholder="Photo URL"
                required
                className="w-full px-4 py-3 rounded-md border-gray-400 border-3 bg-gray-50 text-gray-800"
              />
            </div>

            <div className="space-y-1 text-sm">
              {/* <label htmlFor="password" className="block dark:text-gray-600">
                Password
              </label> */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 rounded-md border-gray-400 border-3 bg-gray-50 text-gray-800"
                />
                <button
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="btn btn-xs absolute top-[12px] right-4 bg-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-red-600 text-xs">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center text-white text-2xl font-bold rounded-sm bg-black cursor-pointer"
            >
              Register
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            <p className="px-3 text-2xl font-bold">OR</p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4 my-6">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline text-xl w-full py-8 lg:py-6"
            >
              <FcGoogle size={24} /> Register With Google
            </button>
          </div>
          <p className="text-md text-center sm:px-6">
            Already have an account?
            <Link to="/login" className="ml-2 underline text-blue-500">
              Log in
            </Link>
          </p>
          <p className="text-md text-center sm:px-6 mt-2">
            Back to
            <Link to="/" className="ml-2 underline text-blue-500">
              Home
            </Link>
          </p>
        </FadeIn>
      </div>
      <div className="hidden lg:block text-center lg:text-left w-auto">
        <Lottie animationData={registerLottie} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Register;
