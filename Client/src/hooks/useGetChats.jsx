import { useContext, useState } from "react";
import AppContext from "../utils/AppContex";
import { getAllUserChat } from "../api/api";

const useGetChats = () => {
  const { setChats } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const getALLchats = async () => {
    setLoading(true);
    try {
      const res = await getAllUserChat();
      if (res.data.success) {
        setChats(res.data.chats);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getALLchats, chatLoading: loading };
};

export default useGetChats;
