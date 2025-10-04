import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Loading from "./Loading";
const Login = () => {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { loading, login } = useLogin();
  const handelChange = () => {
    setChange(!change);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-8 rounded shadow-md w-96">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            <span className="text-purple-600">Welcome</span> back
          </h2>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 ">
            <label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email Address is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className=" border p-2 rounded focus:outline-2 focus:border-0 focus:outline-purple-600"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={change ? "text" : "password"}
              {...register("password", {
                required: { value: true, message: "password is required" },
              })}
              className="border p-2 rounded focus:outline-2 focus:border-0 focus:outline-purple-600"
            />
            <div className="absolute right-3 top-10" onClick={handelChange}>
              {change ? <FaEye /> : <FaEyeSlash />}
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>
              create an account?
              <button onClick={() => navigate("/")} className="text-purple-600">
                click me
              </button>
            </p>

            <button
              type="submit"
              className="flex justify-center items-center bg-purple-600 w-full text-white py-2 rounded-md cursor-pointer"
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
