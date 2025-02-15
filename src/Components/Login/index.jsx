import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL)
      .then(({ data }) => setData(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again later.");
      });
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = ({ email, password }) => {
    const user = data.find(
      (value) => value.Email_Adress === email && value.Password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } else {
      toast.error("Email or password is incorrect.");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handleSubmit(submit)} className="w-[50%] mx-auto">
        <h1 className="text-2xl pb-10">Login Page</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Your Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="text"
            id="email"
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Your Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="* * * * *"
            id="password"
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-[100%] text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Submit
        </button>
        <span className="flex items-center gap-2 mt-3">
          <p>If you have not registered yet </p>
          <Link to={"/register"} className="underline text-green-600">
            Click here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
