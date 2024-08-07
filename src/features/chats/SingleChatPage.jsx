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

  const userr = useSelector((state) => state.user);

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
    <div className="relative rounded-r-3xl overflow-clip   flex max-w-full flex-col w-full h-[95dvh] bg-gray-100">
      <img
        src={bgImage}
        alt="chat background image"
        className="absolute select-none w-auto h-full -hue-rotate-15"
        draggable="false"
      />
      <header className="absolute animate-in slide-in-from-top-full  duration-300 z-50 w-full flex bg-white/90 backdrop-blur-xl justify-between items-center gap-2 p-6 pt-10">
        <div className="pr-2 cursor-pointer" onClick={() => navigate("/")}>
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
                  // FIXME: creats chat scroll issues, change it to padding in a seperate div
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
                  } ${
                    messages[i + 1]?.senderId === message?.senderId && "mr-9"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-[11px] text-white/80 self-end">
                    {message.timestamp.slice(0, 5)}
                  </p>
                </div>
                {messages[i + 1]?.senderId !== message?.senderId && (
                  <img
                    src={userr.photoUrl}
                    alt="User Profile"
                    className="size-8 rounded-full border"
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
                  } ${
                    messages[i + 1]?.senderId === message?.senderId && "ml-9"
                  }`}
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
      <footer className="px-6 pb-6 animate-in slide-in-from-bottom-full duration-300 -mt-8 z-50 relative justify-center flex items-center">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSendMessage();
            }
          }}
          className="h-fit p-3 pr-11 shadow-2xl shadow-black bg-white/90 backdrop-blur-lg outline-none rounded-full w-full"
          placeholder="Type message..."
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-8 bg-gradient-to-b from-indigo-400 to-violet-500 p-1 rounded-full text-white"
        >
          <ArrowUp />
        </button>
        {
          <button
            onClick={scrollToBottom}
            className="absolute -top-12 -rotate-90 bg-gradient-to-b bg-white/90 backdrop-blur-md p-1 rounded-full animate-in zoom-in-75"
          >
            <ChevronLeft />
          </button>
        }
      </footer>
    </div>
  );
}
