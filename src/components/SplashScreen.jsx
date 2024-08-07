import React from "react";
import logo from "../assets/chat.png";

export default function SplashScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col animate-pulse items-center gap-3 font-bold">
        <img
          draggable="false"
          src={logo}
          alt="app icon"
          className="size-14 select-none md:size-20"
        />
        <p className="text-md md:text-2xl">Chat App</p>
      </div>
    </div>
  );
}
