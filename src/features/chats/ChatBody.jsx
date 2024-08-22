import React, { useEffect } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatBody({ contact, messages, user, messagesEndRef }) {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      {messages.map((message, i) =>
        message.senderId === user.id ? (
          <ChatBubble
            key={message.id}
            message={message}
            messages={messages}
            index={i}
            chatBubbleType="sended"
          />
        ) : (
          <ChatBubble
            key={message.id}
            message={message}
            messages={messages}
            index={i}
            chatBubbleType="recived"
          />
        )
      )}
      <div ref={messagesEndRef} />
    </main>
  );
}
