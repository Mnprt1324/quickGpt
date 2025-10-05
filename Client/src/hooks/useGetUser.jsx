import { useContext, useState } from "react";
import AppContext from "../utils/AppContex";
import { getUserDetails } from "../api/api";
import toast from "react-hot-toast";

export const useGetUser = () => {
  const { setUser ,setCredits} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
      setLoading(true);
    try {
     const res=await getUserDetails();
     if(res.data?.user){
        setUser(res.data.user);
        setCredits(res.data.user.credites)
        setLoading(false);
     }
    } catch (error) {
        console.log(error);
      toast.error(error.response?.data?.message || "user failed");
    } finally {
      setLoading(false);
    }
  };
  return { loading, getUser };
};
