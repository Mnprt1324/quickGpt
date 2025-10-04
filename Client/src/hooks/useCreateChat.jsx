import { useState } from "react";
import toast from "react-hot-toast";
import { createNewChat } from "../api/api";
const useCreateChat = () => {
  const [loading, setLoading] = useState(false);
  const creatChat = async () => {
    setLoading(true);
    try {
      const res = await createNewChat();
      if (res.data.success) {
        toast.success(res.data.message || "New Chat Created");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { creatChat, isPending: loading };
};

export default useCreateChat;
