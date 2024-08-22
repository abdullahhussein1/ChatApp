import { useRef } from "react";
import { useParams } from "react-router-dom";
import bgImage from "../../assets/chat-bg-2.jpeg";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useGetUserByIdQuery } from "../api/apiSlice";
import { RotatingLines } from "react-loader-spinner";

export default function SingleChatPage() {
  const { contactId } = useParams();
  const { data: contact, isLoading } = useGetUserByIdQuery(contactId);

  const messagesEndRef = useRef(null);

  return (
    <div className="relative rounded-r-3xl overflow-clip flex max-w-full flex-col w-full h-[98dvh] md:h-[95dvh] bg-gray-100">
      <img
        draggable="false"
        src={bgImage}
        alt="chat background image"
        className="absolute select-none flex-none w-auto h-full -hue-rotate-15"
      />
      {isLoading ? (
        <div className="flex font-medium h-dvh flex-1 z-20 justify-center items-center">
          <div className="p-3 bg-white rounded-2xl shadow-2xl shadow-gray-500 animate-in zoom-in-90">
            <RotatingLines
              width="25"
              strokeColor="black"
              animationDuration="0.75"
              strokeWidth="3"
            />
          </div>
        </div>
      ) : (
        <>
          <ChatHeader contact={contact} />
          <ChatBody contact={contact} messagesEndRef={messagesEndRef} />
          <ChatFooter
            contact={contact}
            key={contact.id}
            messagesEndRef={messagesEndRef}
          />
        </>
      )}
    </div>
  );
}
