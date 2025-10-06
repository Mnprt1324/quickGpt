import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { logoutApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import AppContext from "../utils/AppContex";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticate } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi();
      if (res.data.success) {
        localStorage.removeItem("quickToken");
        localStorage.removeItem("theme");
        navigate("/login");
        setLoading(false);
        setIsAuthenticate(false);
        toast.success(res.data?.message || "User Logout");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
      setLoading(false);
    }
  };
  return { logout, isLoading: loading };
};

export default useLogout;
