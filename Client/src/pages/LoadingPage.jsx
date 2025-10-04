import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export const LoadingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);
return ()=> clearTimeout(timeout);
    
  }, []);
  return (
    <div className="bg-gradient-to-b  from-[#531B81] to-[#29184B]  backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl">
      <Loading />
    </div>
  );
};
