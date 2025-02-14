import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASE_URL).then(({ data }) => setdata(data));
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submit = ({ email, password }) => {
    data.filter((value) => {
      let newdata = value.Email_Adress == email && value.Password == password;

      if (newdata) {
        localStorage.setItem("user", JSON.stringify(newdata));
        navigate("/user");
      } else {
        seterror(true);
      }
    });
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(submit)} className="w-[50%] mx-auto">
        <h1 className="text-2xl pb-10">Login Page</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Email
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
            placeholder="Your Email"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="* * * * *"
            id="password"
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
          />
        </div>
        {error && (
          <p className="text-[15px] my-0.5 text-red-600   rounded-md">
            Email or Password incorrect
          </p>
        )}
        <button
          type="submit"
          className="w-[100%] text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm   px-5 py-2.5 text-center ">
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
