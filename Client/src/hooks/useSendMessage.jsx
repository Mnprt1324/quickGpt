import { useState } from "react";
import toast from "react-hot-toast";
import { sendMessageApi } from "../api/api";
import { useContext } from "react";
import AppContext from "../utils/AppContex";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setCredits } = useContext(AppContext);
  const sendPrompt = async (data) => {
    setLoading(true);
    try {
      const res = await sendMessageApi(data);
      console.log(res);
      if (res.data.success) {
        setCredits((prev) => prev - 1);
        setLoading(false);
      }
      return res.data.reply;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendPrompt };
};
