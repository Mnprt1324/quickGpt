import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { paymntVerifyApi } from "../api/api";
import { useRef } from "react";

export const LoadingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const hasVerified = useRef(false);

  const verifyPayment = async () => {
    if (hasVerified.current) return;
    hasVerified.current = true;
    try {
      const res = await paymntVerifyApi(sessionId);
      if (res.data.success) {
        toast.success("Payment Verified");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment verification failed");
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="bg-gradient-to-b  from-[#531B81] to-[#29184B]  backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl">
      <Loading />
    </div>
  );
};
