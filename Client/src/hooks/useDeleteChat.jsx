import { useState } from "react";
import { deleteChat } from "../api/api";
import toast from "react-hot-toast";
import { useContext } from "react";
import AppContext from "../utils/AppContex";

const useDeleteChat = () => {
  const {setChats } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const deleteUserChat = async (chatId) => {
    setLoading(true);
    try {
      const res = await deleteChat(chatId);
      if (res.data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error.response.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return { deleteChat: deleteUserChat, deleteLoading: loading };
};

export default useDeleteChat;
