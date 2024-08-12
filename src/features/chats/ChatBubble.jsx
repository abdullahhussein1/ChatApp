import React from "react";
import { useSelector } from "react-redux";
import { getColorById } from "../../data/colors";

export default function ChatBubble({
  message,
  messages,
  i,
  chatBubbleType,
  contact,
}) {
  const user = useSelector((state) => state.user);

  const color = getColorById(contact.id);

  if (chatBubbleType == "sended") {
    return (
      <div
        className={`flex justify-end items-end w-full z-20 px-6 gap-1 ${
          messages[i + 1]?.senderId === message?.senderId ? "pb-[2px]" : "pb-3"
        }`}
      >
        <div
          className={`bg-gradient-to-r from-indigo-400 to-violet-500 w-fit flex flex-col shadow-2xl shadow-gray-400/70 max-w-96 text-white px-3 py-[6px] ${
            messages[i + 1]?.senderId === message?.senderId &&
            messages[i - 1]?.senderId === message?.senderId
              ? "rounded-l-2xl rounded-r-none"
              : messages[i + 1]?.senderId === message?.senderId
              ? "rounded-l-2xl rounded-tr-2xl rounded-br-none"
              : messages[i - 1]?.senderId === message?.senderId
              ? "rounded-l-2xl rounded-br-2xl rounded-tr-none"
              : "rounded-2xl"
          } ${messages[i + 1]?.senderId === message?.senderId && "mr-9"}`}
        >
          <p>{message.content}</p>
          <p className="text-[11px] text-white/80 self-end">
            {message.timestamp.slice(0, 5)}
          </p>
        </div>
        {messages[i + 1]?.senderId !== message?.senderId && (
          <img
            draggable="false"
            src={user.photoUrl}
            alt="User Profile"
            className="size-8 rounded-full  select-none border"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex justify-start items-end w-full px-6 z-20 gap-1 ${
        messages[i + 1]?.senderId === message?.senderId ? "pb-[2px]" : "pb-3"
      }`}
    >
      {messages[i + 1]?.senderId !== message?.senderId && (
        <div
          className={`relative flex items-center justify-center size-8 ${color[0]} rounded-full`}
        >
          <p className={`${color[1]} text-sm font-medium`}>
            {contact.username.split(" ")[0][0]}
            {contact.username.split(" ")[1][0]}
          </p>
        </div>
      )}
      <div
        className={`bg-white w-fit shadow-2xl shadow-gray-400/70 flex flex-col max-w-96 px-3 py-2 ${
          messages[i + 1]?.senderId === message?.senderId &&
          messages[i - 1]?.senderId === message?.senderId
            ? "rounded-r-2xl rounded-l-none"
            : messages[i + 1]?.senderId === message?.senderId
            ? "rounded-r-2xl rounded-tl-2xl rounded-bl-none"
            : messages[i - 1]?.senderId === message?.senderId
            ? "rounded-r-2xl rounded-bl-2xl rounded-tl-none"
            : "rounded-2xl"
        } ${messages[i + 1]?.senderId === message?.senderId && "ml-9"}`}
      >
        <p>{message.content}</p>
        <p className="text-[11px] text-black/40 self-end">
          {message.timestamp.slice(0, 5)}
        </p>
      </div>
    </div>
  );
}
