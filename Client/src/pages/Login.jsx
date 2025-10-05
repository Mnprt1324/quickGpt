import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Loading from "./Loading";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className=" relative flex justify-center items-center min-h-screen overflow-hidden py-8 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-40 absolute  right-[-50px] top-[-100px] md:right-[-100]  md:w-75 aspect-square rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-800 "></div>
       <div className="w-40 left-[-50px]  bottom-[-50px]  absolute md:left-[-100px] md:bottom-[-100px] md:w-75 aspect-square rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-800"></div>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-600">
            <span className="text-purple-600">Welcome</span> back
          </h2>
          <p className="text-gray-500 text-sm">Login to your QuickGPT account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email address is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="border border-gray-300 p-2.5 rounded-md focus:outline-2 focus:border-0 focus:outline-purple-600 transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              className="border border-gray-300 p-2.5 rounded-md focus:outline-2 focus:border-0 focus:outline-purple-600 transition-all pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center bg-purple-600 hover:bg-purple-700 w-full text-white py-2.5 rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loading /> : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
            >
              Create account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;