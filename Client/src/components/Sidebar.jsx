import { FaRegCircleUser, FaWandMagicSparkles } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useContext, useEffect } from "react";
import AppContext from "../utils/AppContex";
import useGetChats from "../hooks/useGetChats";
import { ImBin } from "react-icons/im";
import useDeleteChat from "../hooks/useDeleteChat";
import moment from "moment";
import Loading from "../pages/Loading";
import useCreateChat from "../hooks/useCreateChat";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export const Sidebar = () => {
  const navigate = useNavigate();
  const { getUser } = useGetUser();
  const { chats, selectedChat, credits, setSelectedChat, setDark, dark } =
    useContext(AppContext);
  const { getALLchats, chatLoading } = useGetChats();
  const { creatChat, isPending } = useCreateChat();
  const { deleteChat, deleteLoading } = useDeleteChat();
  const [filterChat, setFilterChat] = useState("");

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getALLchats();
  }, [isPending]);

  const { user } = useContext(AppContext);

  const handelChatBox = (chat) => {
    navigate(`/chat/${chat._id}`);
    setSelectedChat(chat);
  };
  return (
    <div className="hidden  md:flex flex-col min-w-72 border-r p-5 gap-3  border-gray-200 dark:bg-gray-900 dark:text-white">
      {/* logo box */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-12 aspect-square bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500   rounded-lg">
          <FaWandMagicSparkles color="white" size={20} />
        </div>

        <div>
          <p className="font-bold">QuickGPT</p>
          <p className="font-light">intelligent AI Assistant</p>
        </div>
      </div>
      {/* add chat */}
      <button
        onClick={creatChat}
        className="flex items-center justify-center cursor-pointer text-white gap-3 border bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500  p-2  rounded-md hover:bg-gray-300"
      >
        {isPending ? (
          <Loading />
        ) : (
          <>
            <span>+</span>
            New Chat
          </>
        )}
      </button>
      {/* search box */}
      <div className="flex relative">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
          <IoIosSearch size={20} />
        </span>
        <input
          type="text"
          placeholder="Search conversations"
          value={filterChat}
          onChange={(e) => setFilterChat(e.target.value)}
          className="w-full p-2 pl-8 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>
      <div>
        <div>Recent Chats</div>
        <div className="flex h-60 flex-col gap-3 mt-3 overflow-x-hidden overflow-y-scroll scroll-hidden mb-4">
          {chats.filter((chat) => {
            const lastMessage = chat.message?.[0]?.content || chat.name || "";
            return lastMessage.toLowerCase().includes(filterChat.toLowerCase());
          }).length === 0 ? (
            <>
              <p className="text-gray-500 text-sm text-center mt-4">
                No chats found
              </p>
            </>
          ) : (
            chats
              .filter((chat) => {
                const lastMessage =
                  chat.message?.[0]?.content || chat.name || "";
                return lastMessage
                  .toLowerCase()
                  .includes(filterChat.toLowerCase());
              })

              .map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handelChatBox(chat)}
                  className=" group relative px-3 py-1 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md"
                >
                  <p className="truncate">
                    {chat.message?.length > 0
                      ? chat.message[0].content.slice(0, 32)
                      : chat.name}
                  </p>
                  <p className="font-light text-sm">
                    {moment(chat.createdAt).fromNow()}
                  </p>
                  <button
                    onClick={() => deleteChat(chat._id)}
                    className="absolute hidden  group-hover:block right-4 top-4 cursor-pointer  "
                  >
                    {deleteLoading ? <Loading /> : <ImBin />}
                  </button>
                </div>
              ))
          )}
        </div>
        <div className=" flex flex-col gap-3 mt-5">
          <div
            onClick={() => navigate("/community")}
            className=" flex  items-center gap-3 p-3  border border-gray-200 cursor-pointer  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md"
          >
            <span>
              <TbPhotoSquareRounded size={20} />
            </span>
            Community images
          </div>
          <div
            onClick={() => navigate("/credits")}
            className=" flex   items-center gap-3 p-3  border border-gray-200 cursor-pointer  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md"
          >
            <span>
              <IoDiamondOutline size={20} />
            </span>
            <div>
              <p>credits:{credits}</p>
              <p className="text-sm text-gray-400">
                purchase credits to use QuickGPT
              </p>
            </div>
          </div>
          <div className=" flex  items-center gap-3 p-3  border border-gray-200 cursor-pointer  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md">
            <span>
              <MdOutlineWbSunny size={20} />
            </span>
            Dark Mode
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={() => setDark(!dark)}
                checked={dark}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>
          <div className=" flex  items-center gap-3 p-3  border border-gray-200 cursor-pointer  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md">
            <span>
              <FaRegCircleUser size={20} />
            </span>
            {user?.name || "loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
