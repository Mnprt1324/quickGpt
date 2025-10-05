import { useContext, useEffect, useRef, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AppContext from "../utils/AppContex";
import { Message } from "./Message";
import Loading from "../pages/Loading";
import { CiPaperplane } from "react-icons/ci";
import { useSendMessage } from "../hooks/useSendMessage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCreateChat from "../hooks/useCreateChat";

export const ChatBox = () => {
  const { chatId } = useParams();
  const { selectedChat, setSelectedChat, isOpen } = useContext(AppContext);
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [mod, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { loading, sendPrompt } = useSendMessage();
  const { creatChat } = useCreateChat();
  const navigate = useNavigate();
  const location = useLocation();
  const initialChat = location.state?.chat;
  const handleSumbit = async (e) => {
    let id = chatId;
    e.preventDefault();
    if (selectedChat === undefined) {
      const chat = await creatChat();
      id = chat._id;
      setSelectedChat(chat);
      navigate(`/chat/${id}`, { state: { chat } });
    }
    setMessage((prev) => [
      ...prev,
      { role: "user", timestamps: Date.now(), content: prompt, isImage: false },
    ]);
    const data = {
      prompt,
      mod,
      isPublished,
      chatId: id,
    };
    const res = await sendPrompt(data);
    if (res) {
      setPrompt("");
      setMessage((prev) => [...prev, res]);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSumbit(e);
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);
  useEffect(() => {
    setMessage(selectedChat?.message || []);
  }, [selectedChat]);

  useEffect(() => {
    if (initialChat) {
      setSelectedChat(initialChat);
    }
  }, [initialChat]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen  ${
        isOpen ? `overflow-hidden` : `overflow-y-scroll`
      } flex-1 scroll-hidden  dark:bg-gray-900`}
    >
      {/* extar box for hidding chats */}
      <div className="flex  items-center    h-16 fixed top-0 w-full  md:h-10 bg-white dark:bg-gray-900 ">
        <div className="ml-3 flex items-center gap-3 md:hidden">
          <div className="flex items-center justify-center w-12 aspect-square bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg">
            <FaWandMagicSparkles color="white" size={20} />
          </div>
          <div>
            <p className="font-bold text-sm dark:text-white">QuickGPT</p>
            <p className="font-light text-sm dark:text-white">
              intelligent AI Assistant
            </p>
          </div>
        </div>
      </div>
      {/* Chat message container */}
      <div className="flex-1 mt-10 px-4 md:px-8 lg:px-16 xl:px-32 py-4 md:py-6  pb-32 md:pb-40">
        {(message?.length === 0 || message === undefined) && (
          <div className="w-full h-full min-h-[79vh] md:min-h-[60vh] flex items-center flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-16 md:w-20 aspect-square bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg">
                <FaWandMagicSparkles color="white" size={30} />
              </div>

              <div>
                <p className="font-bold text-2xl md:text-3xl dark:text-white">
                  QuickGPT
                </p>
                <p className="font-light text-sm md:text-base dark:text-white">
                  intelligent AI Assistant
                </p>
              </div>
            </div>
            <p className="text-3xl md:text-5xl lg:text-6xl dark:text-white text-center">
              welcome to QuickGPT
            </p>
            <p className="text-lg md:text-2xl text-gray-400 text-center mt-2">
              Ask me Anything
            </p>
          </div>
        )}

        {message?.map((message) => (
          <Message message={message} key={message._id || message.timestamps} />
        ))}

        {/* Three dot loading animation */}
        {loading && (
          <div className="flex items-center gap-1.5 ml-4">
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        )}
      </div>

      {/* Fixed input container at bottom */}
      <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {/* Publish checkbox for image mode */}
        {mod === "image" && (
          <div className="flex items-center justify-center py-2 px-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                disabled={loading}
                type="checkbox"
                onChange={(e) => setIsPublished(e.target.checked)}
                checked={isPublished}
                className="w-4 h-4 accent-purple-600"
              />
              <p className="dark:text-white text-sm">
                Publish Generated Image To Community
              </p>
            </label>
          </div>
        )}

        {/* Input form */}
        <div className="px-4 py-3 md:px-8 lg:px-16 xl:px-32 ">
          <div className="flex items-center gap-2 sm:gap-3 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 transition-colors duration-200 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-200">
            {/* Mode Selector */}
            <div className="flex-shrink-0">
              <select
                onChange={(e) => setMode(e.target.value)}
                value={mod}
                disabled={loading}
                className="px-2 md:px-3 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Select input mode"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
              </select>
            </div>

            {/* Text Input */}
            <input
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={`Type your ${mod} prompt here...`}
              disabled={loading}
              className="flex-1 min-w-0 px-2 md:px-3 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent outline-none focus:placeholder-gray-300 disabled:opacity-50"
              aria-label="Chat prompt input"
            />

            {/* Character Count */}
            {prompt.length > 0 && (
              <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 font-mono">
                {prompt.length}
              </span>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSumbit}
              disabled={loading || !prompt.trim()}
              className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-md hover:shadow-lg"
              aria-label="Send message"
            >
              {loading ? (
                <Loading />
              ) : (
                <CiPaperplane className="text-white" size={18} />
              )}
            </button>
          </div>

          {/* Helper Text */}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center hidden md:block">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">
              Enter
            </kbd>{" "}
            to send
          </p>
        </div>
      </div>
    </div>
  );
};
