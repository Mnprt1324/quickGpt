import toast from "react-hot-toast";
import { loginUserApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../utils/AppContex";
export const useLogin = () => {
  const navigate = useNavigate();
  const {setIsAuthenticate}=useContext(AppContext);
  const [loading, setLoading] = useState(false);
  
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginUserApi(data);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("quickToken", res.data.token);
        setIsAuthenticate(true)
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
