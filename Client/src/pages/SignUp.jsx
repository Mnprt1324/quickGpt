import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import useSingup from "../hooks/useSingup";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, signup } = useSingup();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    const { confirmPassword, ...fromData } = data;
    const fData = Object.fromEntries(
      Object.entries(fromData).map(([key, value]) => [
        key,
        typeof value === "string" ? value.toLowerCase() : value,
      ])
    );
    signup(fData);
  };

  return (
    <div className="relative flex  bg-gradient-to-br from-purple-50 to-blue-50  overflow-hidden justify-center items-center min-h-screen  py-8 px-4">
      <div className="w-40 left-[-50px] top-[-50px]   absolute md:left-[-100px] md:top-[-100px] md:w-75 aspect-square rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-800"></div>
      <div className="w-40 absolute  right-[-50px] bottom-[-50px] md:right-[-100px] md:bottom-[-100px] md:w-75 aspect-square rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-800 "></div>
      <div className="p-6 md:p-8  bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-600">
            Create <span className="text-purple-600">Account</span>
          </h2>
          <p className="text-gray-500 text-sm">Join QuickGPT today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: { value: true, message: "Name is required" },
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters",
                },
              })}
              className="border border-gray-300 p-2.5 rounded-md focus:outline-2 focus:border-0 focus:outline-purple-600 transition-all"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

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
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain uppercase, lowercase, and number",
                },
              })}
              className="border border-gray-300 p-2.5 rounded-md focus:outline-2 focus:border-0 focus:outline-purple-600 transition-all pr-10"
              placeholder="Create a password"
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

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border border-gray-300 p-2.5 rounded-md focus:outline-2 focus:border-0 focus:outline-purple-600 transition-all pr-10"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEye size={18} />
              ) : (
                <FaEyeSlash size={18} />
              )}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit and Login Link */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center bg-purple-600 hover:bg-purple-700 w-full text-white py-2.5 rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loading /> : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
