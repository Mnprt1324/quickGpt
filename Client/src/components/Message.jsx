import { FaRegUser } from "react-icons/fa6";
import moment from "moment";
import Markdown from "react-markdown";
import { useEffect } from "react";
import Prism from "prismjs";
export const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 border  dark:bg-primary  border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm ">{message.content}</p>
            <span className="text-xs  text-gray-400">
              {moment(message.timestamps).fromNow()}
            </span>
          </div>
          <div className="bg-[#e07c1f] w-12 h-12 rounded-full flex items-center justify-center text-white ">
            <FaRegUser />
          </div>
        </div>
      ) : (
        <div className=" inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-slate-50 dark:bg-primary  border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <img
              src={message.content}
              alt=""
              className="w-full  max-w-md  mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm reset-tw  ">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs  text-gray-400">
            {moment(message.timestamps).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};
