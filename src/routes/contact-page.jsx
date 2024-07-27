import { useEffect, useRef } from "react";
import { ArrowUp, ChevronLeft, PhoneIcon, VideoIcon } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getContactById } from "../data/contacts";
import { getMessagesByConversationId } from "../data/messages";
import { user } from "../data/user";
import { getConversationsByParticipantsId } from "../data/conversations";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  const contact = getContactById(Number(params.contactId));
  return contact;
}

export default function Contact() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const conversation = getConversationsByParticipantsId(user.id, contact.id);

  const messages = getMessagesByConversationId(conversation?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex flex-col overflow-clip h-screen bg-gray-100">
      <header className="absolute z-50 w-full flex bg-white/95 backdrop-blur-2xl justify-between items-center gap-2 p-6 pt-10">
        <div className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </div>
        <div className="flex flex-none items-center justify-center size-10 bg-blue-50 rounded-full">
          <p className="text-blue-600">
            {contact.username.split(" ")[0][0]}
            {contact.username.split(" ")[1][0]}
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-bold text-md">{contact.username}</p>
          <p className="text-xs font-light text-green-500">Online</p>
        </div>
        <VideoIcon className="mr-3" />
        <PhoneIcon />
      </header>
      <main className="flex-1 flex flex-col gap-2 overflow-y-auto pt-32 pb-6 px-6">
        {messages.map((message) => {
          if (message.senderId === user.id) {
            return (
              <div
                key={message.id}
                className="self-end w-fit flex flex-col gap-1 max-w-96"
              >
                <div className="bg-blue-500 flex flex-col text-white px-4 py-2 rounded-3xl">
                  <p>{message.content}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {message.timestamp.toTimeString().slice(0, 5)}
                </p>
              </div>
            );
          } else {
            return (
              <div
                key={message.id}
                className="w-fit flex flex-col gap-1 max-w-96"
              >
                <div className="bg-white px-4 py-2 rounded-3xl">
                  <p>{message.content}</p>
                </div>
                <p className="text-xs text-gray-400 self-end">
                  {message.timestamp.toTimeString().slice(0, 5)}
                </p>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </main>
      <footer className="px-6 pb-6 relative flex items-center">
        <div className="absolute -top-5 w-full h-5 bg-gradient-to-t from-gray-100 via-gray-100 to-transparent"></div>
        <input
          type="text"
          className="h-fit p-3 outline-none rounded-full w-full"
          placeholder="Type message..."
        />
        <div className="absolute right-8 bg-blue-500 p-1 rounded-full text-white">
          <ArrowUp />
        </div>
      </footer>
    </div>
  );
}
