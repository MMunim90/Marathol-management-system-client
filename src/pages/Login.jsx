import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import loginLottie from '../../src/assets/lotties/login.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();
  const { signInWithGoogle, signIn } = use(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log({email, password})
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: `${user.displayName} Login successful`,
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorcode = error.code;
        // const errorMessage = error.message;
        if(error){
          Swal.fire({
          title: "Incorrect Username or Password",
          icon: "error",
          draggable: true,
        });
        }
        setError(errorcode);
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
          title: `${user.displayName} Login successful`,
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorCode, errorMessage);
      });
  };

  return (
    <div className="hero-content flex-col lg:flex-row">
      <Helmet>
        <title>Login | Runfinity</title>
      </Helmet>
      <div className="text-center lg:text-left w-auto ">
        <Lottie animationData={loginLottie} loop={true}></Lottie>
      </div>
      <div className="w-full lg:max-w-md p-8 space-y-3 rounded-xl bg-gray-400 my-10 mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800"
          />
          {/* <div className="flex justify-end text-xs text-gray-600 hover:underline">
            <Link to="/auth/forgetPass" rel="noopener noreferrer">
              Forgot Password?
            </Link>
          </div> */}

          {error && <p className="text-red-600 text-xs">Incorrect Password</p>}
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center text-white text-2xl font-bold rounded-sm bg-black cursor-pointer"
        >
          Log in
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
          className="btn btn-outline text-xl w-full py-6"
        >
          <FcGoogle size={24} /> Login With Google
        </button>
      </div>
      <p className="text-md text-center sm:px-6">
        Don't have an account?
        <Link to="/register" className="ml-2 underline text-black">
          Register
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
