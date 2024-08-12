import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { getContactById } from "../../data/contacts";
import bgImage from "../../assets/chat-bg-2.jpeg";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

export function loader({ params }) {
  const contact = getContactById(Number(params.contactId));
  return contact;
}

export default function SingleChatPage() {
  const contact = useLoaderData();

  const messagesEndRef = useRef(null);

  return (
    <div className="relative rounded-r-3xl overflow-clip flex max-w-full flex-col w-full h-[98dvh] md:h-[95dvh] bg-gray-100">
      <img
        draggable="false"
        src={bgImage}
        alt="chat background image"
        className="absolute select-none w-auto h-full -hue-rotate-15"
      />
      <ChatHeader contact={contact} />
      <ChatBody contact={contact} messagesEndRef={messagesEndRef} />
      <ChatFooter
        contact={contact}
        key={contact.id}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}
