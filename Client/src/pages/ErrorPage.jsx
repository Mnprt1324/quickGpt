import { useNavigate } from "react-router-dom";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { IoArrowBack, IoConstruct } from "react-icons/io5";
import { MdAutorenew } from "react-icons/md";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="text-center max-w-2xl">
        {/* Construction Icon with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative inline-block p-8 bg-white rounded-full shadow-lg">
            <IoConstruct className="w-32 h-32 md:w-40 md:h-40 text-blue-500" />
            <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-3 shadow-lg animate-spin">
              <MdAutorenew className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mb-4">
            Under Construction
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            We're Building Something Amazing!
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-2">
            This page is currently under construction and will be available soon.
          </p>
          <p className="text-gray-500 text-base">
            Our team is working hard to bring you an incredible experience. Stay tuned!
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 font-medium mb-3">Development Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{ width: '65%' }}></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Estimated completion: Coming Soon</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-purple-50 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 w-full sm:w-auto"
          >
            <IoArrowBack size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 w-full sm:w-auto"
          >
            <HiHome size={20} />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;