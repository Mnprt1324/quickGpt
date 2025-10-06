import { useEffect } from "react";
import { createContext, useState } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const name = "Manpreet Singh";
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [credits, setCredits] = useState(0);
  const [selectedChat, setSelectedChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const token = localStorage.getItem("quickToken");
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    setSelectedChat(chats[0]);
  }, []);
  useEffect(() => {
    if (token) {
      setIsAuthenticate(true);
      console.log(isAuthenticate);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        name,
        user,
        setUser,
        setChats,
        chats,
        selectedChat,
        setSelectedChat,
        setDark,
        dark,
        credits,
        setCredits,
        setIsOpen,
        isOpen,
        isAuthenticate,
        setIsAuthenticate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
