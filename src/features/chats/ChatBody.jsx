import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getChatByParticipantsId } from "./chats";
import { getMessagesBychatId } from "../../data/messages";
import { user as userDate } from "../../data/user";
import { getColorById } from "../../data/colors";

export default function ChatBody({ contact, messagesEndRef }) {
  const user = userDate;

  const userr = useSelector((state) => state.user);

  const chats = useSelector((state) => state.chats);
  const messagesState = useSelector((state) => state.messages);

  const chat = getChatByParticipantsId(chats, user.id, contact.id);
  const messages = getMessagesBychatId(messagesState, chat?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const color = getColorById(contact.id);

  return (
    <main className="flex-1 flex items-center h-dvh flex-col overflow-y-scroll pt-32 pb-8">
      {messages.length === 0 && (
        <div className="flex font-medium h-dvh flex-1 z-20 justify-center items-center">
          <div className="px-3 py-2 bg-white rounded-2xl shadow-2xl shadow-gray-500 animate-in zoom-in-90">
            <p>Start chat with {contact.username.split(" ")[0]}</p>
          </div>
        </div>
      )}
      <div className="mt-auto"></div>
      {messages.map((message, i) => {
        if (message.senderId === user.id) {
          return (
            <div
              key={message.id}
              className={`flex justify-end items-end w-full z-20 px-6 gap-1 ${
                messages[i + 1]?.senderId === message?.senderId
                  ? "pb-[2px]"
                  : "pb-3"
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
                  src={userr.photoUrl}
                  alt="User Profile"
                  className="size-8 rounded-full  select-none border"
                />
              )}
            </div>
          );
        } else {
          return (
            <div
              key={message.id}
              className={`flex justify-start items-end w-full px-6 z-20 gap-1 ${
                messages[i + 1]?.senderId === message?.senderId
                  ? "pb-[2px]"
                  : "pb-3"
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
      })}
      <div ref={messagesEndRef} />
    </main>
  );
}
