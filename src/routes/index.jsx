import React from "react";
import bgImage from "../assets/chat-bg-2.jpeg";

export default function Index() {
  return (
    <div className="relative w-full h-[95dvh] flex items-center justify-center">
      <div className="flex font-medium h-dvh  flex-1 z-20 justify-center items-center">
        <p className="px-3 py-2 animate-in zoom-in-90 bg-white rounded-2xl shadow-2xl shadow-gray-500">
          Select a Contact to Start Chating
        </p>
      </div>
      <img
        src={bgImage}
        alt="chat background image"
        className="absolute select-none w-auto h-full -hue-rotate-15"
        draggable="false"
      />
    </div>
  );
}
