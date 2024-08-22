import React from "react";

export default function ChatBubble({ message, messages, i, chatBubbleType }) {
  if (chatBubbleType == "sended") {
    return (
      <div
        className={`flex justify-end items-end w-full z-20 px-3 gap-1 ${
          messages[i + 1]?.senderId === message?.senderId ? "pb-[2px]" : "pb-3"
        }`}
      >
        <div
          className={`bg-gradient-to-r from-indigo-600/75 backdrop-blur-sm to-blue-700/75 w-fit flex flex-col shadow-2xl shadow-gray-400/70 ms-14 text-white px-3 py-[6px] ${
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
            {new Date(message.sendedAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-start items-end w-full px-3 z-20 gap-1 ${
        messages[i + 1]?.senderId === message?.senderId ? "pb-[2px]" : "pb-3"
      }`}
    >
      <div
        className={`bg-white/75 backdrop-blur-sm w-fit shadow-2xl shadow-gray-400/70 flex flex-col me-14 px-3 py-2 ${
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
          {new Date(message.sendedAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
