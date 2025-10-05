import { useState } from "react";
import toast from "react-hot-toast";
import { createNewChat } from "../api/api";
import useGetChats from "./useGetChats";
const useCreateChat = () => {
  const [loading, setLoading] = useState(false);
  const { getALLchats } = useGetChats();
  const creatChat = async () => {
    setLoading(true);
    try {
      const res = await createNewChat();
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message || "New Chat Created");
        await getALLchats();
        setLoading(false);
        return res.data.chat;
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { creatChat, isPending: loading };
};

export default useCreateChat;
