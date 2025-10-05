import { useState } from "react";
import toast from "react-hot-toast";
import { signupApi } from "../api/api";
import { useLogin } from "./useLogin";

const useSingup = () => {
  const [loading, setLoading] = useState(false);
  const {login}=useLogin()
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await signupApi(data);
      if (res.data.success) {
        toast.success(res.data?.message || "Account Created");
           login(data)
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message || "Somthing Went Wrong");
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSingup;
