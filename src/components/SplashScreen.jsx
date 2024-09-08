import React from "react";
import logo from "../assets/favicon.svg";

export default function SplashScreen() {
  return (
    <div className="flex h-dvh items-center justify-center bg-white">
      <div className="flex flex-col animate-pulse items-center gap-3 font-bold">
        <img
          draggable="false"
          src={logo}
          alt="app icon"
          className="size-14 flex-none select-none md:size-20"
        />
        <p className="text-md md:text-2xl font-mono font-bold">Connect</p>
      </div>
    </div>
  );
}
