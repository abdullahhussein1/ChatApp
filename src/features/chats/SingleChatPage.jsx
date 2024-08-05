import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronLeft, PhoneIcon, VideoIcon } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getContactById } from "../../data/contacts";
import { getMessagesBychatId } from "../../data/messages";
import { user } from "../../data/user";
import { getColorById } from "../../data/colors";
import { getChatByParticipantsId } from "./chats";
import { useDispatch, useSelector } from "react-redux";
import { chatStarted } from "./chatsSlice";
import bgImage from "../../assets/chat-bg-2.jpeg";
import { messageSended } from "../messages/messagesSlice";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  const contact = getContactById(Number(params.contactId));
  return contact;
}

export default function SingleChatPage() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);
  const chats = useSelector((state) => state.chats);
  const messagesState = useSelector((state) => state.messages);

  const color = getColorById(contact.id);
  const chat = getChatByParticipantsId(chats, user.id, contact.id);
  const messages = getMessagesBychatId(messagesState, chat?.id);

  const handleSendMessage = () => {
    if (!messageInput) return;
    dispatch(chatStarted(user.id, contact.id));
    dispatch(messageSended(chat.id, user.id, messageInput));
    setMessageInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative animate-in slide-in-from-right duration-300 flex max-w-full flex-col w-full h-screen bg-gray-100">
      <img
        src={bgImage}
        alt="chat background image"
        className="absolute select-none w-auto h-full -hue-rotate-15"
        draggable="false"
      />
      <header className="absolute z-50 w-full flex bg-white/95 backdrop-blur-2xl justify-between items-center gap-2 p-6 pt-10">
        <div className="pr-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </div>
        <div
          className={`relative flex flex-none items-center justify-center size-10 ${color[0]} rounded-full`}
        >
          <p className={`${color[1]} text-sm font-medium`}>
            {contact.username.split(" ")[0][0]}
            {contact.username.split(" ")[1][0]}
          </p>
          {contact.status === "online" && (
            <div className="absolute bg-green-500 rounded-full size-2 bottom-0 right-[2px] ring-white ring-2"></div>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-bold text-md">{contact.username}</p>
          <p className="text-xs font-light text-green-500">Online</p>
        </div>
        <VideoIcon className="mr-3" />
        <PhoneIcon />
      </header>
      <main className="flex-1 flex items-center flex-col overflow-y-scroll pt-32 pb-6 px-6">
        {messages.length === 0 && (
          <div className="flex font-medium flex-1 z-20 justify-center items-center">
            <p className="px-3 py-2 bg-white rounded-2xl">
              Start chat with {contact.username.split(" ")[0]}
            </p>
          </div>
        )}
        <div className="mt-auto"></div>
        {messages.map((message, i) => {
          if (message.senderId === user.id) {
            return (
              <div
                key={message.id}
                className={`flex justify-end items-end w-full z-20 gap-[2px] ${
                  messages[i + 1]?.senderId === message?.senderId
                    ? "mb-1"
                    : "mb-2"
                }`}
              >
                <div className="bg-blue-500 w-fit flex flex-col max-w-96 text-white px-4 py-2 rounded-3xl">
                  <p>{message.content}</p>
                </div>
                {messages[i + 1]?.senderId !== message?.senderId && (
                  <p className="text-xs -order-1 text-gray-400">
                    {message.timestamp.slice(0, 5)}
                  </p>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={message.id}
                className={`flex justify-start items-end w-full z-20 gap-[2px] ${
                  messages[i + 1]?.senderId === message?.senderId
                    ? "mb-1"
                    : "mb-2"
                }`}
              >
                <div className="bg-white px-4 py-2 rounded-3xl w-fit max-w-96">
                  <p>{message.content}</p>
                </div>
                {messages[i + 1]?.senderId !== message?.senderId && (
                  <p className="text-xs text-gray-400">
                    {message.timestamp.slice(0, 5)}
                  </p>
                )}
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </main>
      <footer className="px-6 pb-6 relative flex items-center">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSendMessage();
            }
          }}
          className="h-fit p-3 outline-none rounded-full w-full"
          placeholder="Type message..."
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-8 bg-blue-500 p-1 rounded-full text-white"
        >
          <ArrowUp />
        </button>
      </footer>
    </div>
  );
}
