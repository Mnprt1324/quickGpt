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
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import useLogout from "../hooks/useLogout";
export const Sidebar = () => {
  const navigate = useNavigate();
  const { getUser } = useGetUser();
  const { chats, credits, setSelectedChat, setDark, isOpen, setIsOpen, dark } =
    useContext(AppContext);
  const { getALLchats } = useGetChats();
  const { creatChat, isPending } = useCreateChat();
  const { deleteChat, deleteLoading } = useDeleteChat();
  const [filterChat, setFilterChat] = useState("");
  const { isLoading, logout } = useLogout();

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
    setIsOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed right-4 top-4  z-50 p-2 bg-gray-900 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isOpen ? (
          <IoClose size={24} color={"white"} />
        ) : (
          <HiMenuAlt3 size={24} color={"white"} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-white-50 backdrop-blur-md opacity-75 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed  md:sticky inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-72 bg-white dark:bg-gray-900 dark:text-white
        border-r border-gray-200 dark:border-gray-700
        flex flex-col h-screen
      `}
      >
        <div className="flex flex-col h-full p-5 gap-3">
          {/* logo box */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-12 aspect-square bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg">
              <FaWandMagicSparkles color="white" size={20} />
            </div>
            <div>
              <p className="font-bold">QuickGPT</p>
              <p className="font-light text-sm">intelligent AI Assistant</p>
            </div>
          </div>

          {/* add chat */}
          <button
            onClick={() => {
              creatChat();
              setIsOpen(false);
            }}
            className="flex items-center justify-center cursor-pointer text-white gap-3 border bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-2 rounded-md hover:opacity-90 transition-opacity"
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
              className="w-full p-2 pl-8 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          {/* Recent Chats - Made scrollable within flex container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="mb-2">Recent Chats</div>
            <div className="flex flex-col gap-3 overflow-y-auto scroll-hidden flex-1">
              {chats.filter((chat) => {
                const lastMessage =
                  chat.message?.[0]?.content || chat.name || "";
                return lastMessage
                  .toLowerCase()
                  .includes(filterChat.toLowerCase());
              }).length === 0 ? (
                <p className="text-gray-500 text-sm text-center mt-4">
                  No chats found
                </p>
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
                      className="group relative px-3 py-2 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md dark:border-gray-700"
                    >
                      <p className="truncate">
                        {chat.message?.length > 0
                          ? chat.message[0].content.slice(0, 32)
                          : chat.name}
                      </p>
                      <p className="font-light text-sm text-gray-500">
                        {moment(chat.createdAt).fromNow()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat._id);
                        }}
                        className="absolute hidden group-hover:block right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {deleteLoading ? <Loading /> : <ImBin />}
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Bottom menu items */}
          <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-3">
            <div
              onClick={() => {
                navigate("/community");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md dark:border-gray-700"
            >
              <span>
                <TbPhotoSquareRounded size={20} />
              </span>
              Community images
            </div>
            <div
              onClick={() => {
                navigate("/credits");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md dark:border-gray-700"
            >
              <span>
                <IoDiamondOutline size={20} />
              </span>
              <div>
                <p>credits: {credits}</p>
                <p className="text-sm text-gray-400">
                  purchase credits to use QuickGPT
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md dark:border-gray-700">
              <span>
                <MdOutlineWbSunny size={20} />
              </span>
              Dark Mode
              <label className="inline-flex items-center cursor-pointer ml-auto">
                <input
                  type="checkbox"
                  onChange={() => setDark(!dark)}
                  checked={dark}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="group relative flex items-center gap-3 p-3 border border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md dark:border-gray-700">
              <span>
                <FaRegCircleUser size={20} />
              </span>
              {user?.name || "loading..."}
              <button
                onClick={() => logout()}
                className="bg-red-500  py-2 px-2 block text-white rounded-md active:scale-105 cursor-pointer right-0 md:hidden  md:group-hover:block absolute "
              >
                {isLoading ? <Loading /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
