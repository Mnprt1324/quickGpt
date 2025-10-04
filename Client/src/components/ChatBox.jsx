import { useContext, useEffect, useRef, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AppContext from "../utils/AppContex";
import { Message } from "./Message";
import Loading from "../pages/Loading";
import { CiPaperplane } from "react-icons/ci";
import { useSendMessage } from "../hooks/useSendMessage";
import { useParams } from "react-router-dom";

export const ChatBox = () => {
  const { chatId } = useParams();
  const { selectedChat } = useContext(AppContext);
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [mod, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);
  const containerRef = useRef(null);
  const { loading, sendPrompt } = useSendMessage();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setMessage((prev) => [
      ...prev,
      { role: "user", timestamps: Date.now(), content: prompt, isImage: false },
    ]);
    const data = {
      prompt,
      mod,
      isPublished,
      chatId,
    };
    const res = await sendPrompt(data);
     if(res){
      setPrompt("")
      setMessage((prev) => [...prev, res]);
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
    setMessage(selectedChat?.message);
  }, [selectedChat]);
  return (
    <div className="flex-1 flex flex-col  justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 ">
      {/* chat message */}
      <div
        className="flex-1 w-full overflow-x-hidden mb-5 scroll-hidden "
        ref={containerRef}
      >
        {message?.length === 0 && (
          <div className="w-full h-[90%] flex items-center flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-20 aspect-square bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500   rounded-lg">
                <FaWandMagicSparkles color="white" size={30} />
              </div>

              <div>
                <p className="font-bold text-3xl dark:text-white">QuickGPT</p>
                <p className="font-light 2xl dark:text-white">intelligent AI Assistant</p>
              </div>
            </div>
            <p className="text-6xl dark:text-white">welcome to QuickGPT</p>
            <p className="text-2xl text-gray-400">Ask me Anything</p>
          </div>
        )}

        {message?.map((message) => (
          <Message message={message} key={message._id} />
        ))}
        {/* three dot loading animation */}
        {loading && (
          <div className="flex items-center gap-1.5">
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
      {/* {prompt input} */}
      {mod === "image" && (
        <label className="text-center flex items-center justify-center ">
          <input
            disabled={loading}
            type="checkbox"
            onChange={(e) => setIsPublished(e.target.checked)}
            checked={isPublished}
          />
          <p className="dark:text-white">Publish Generated Image To Community</p>
        </label>
      )}
      <form
        action=""
        className="flex rounded-full w-full max-w-2xl pl-4 mx-auto gap-4 items-center bg-blue-50 border-1 border-purple-300"
        onSubmit={handleSumbit}
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mod}
          id=""
          className="text-sm pl-3 pr-2 outline-none"
        >
          <option value="text">text</option>
          <option value="image">image</option>
        </select>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Enter your prompt here...."
          required
          className="flex-1 w-full p-3 text-sm outline-none"
        />
        <button className="bg-purple-700 mr-1 h-[90%] aspect-square rounded-full flex justify-center items-center cursor-pointer">
          {loading ? <Loading /> : <CiPaperplane color="white" size={25} />}
        </button>
      </form>
    </div>
  );
};
