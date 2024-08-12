import React from "react";
import { useSelector } from "react-redux";
import { UserPlusIcon } from "lucide-react";

export default function HomePageHeader({ onUserProfileClick }) {
  const user = useSelector((state) => state.user);

  return (
    <header className="flex justify-between items-center px-6">
      <button
        onClick={() => onUserProfileClick(true)}
        className="flex gap-2 items-center hover:bg-gray-50/80 border duration-300 border-white hover:border-gray-100 transition-colors p-2 rounded-2xl"
      >
        <img
          draggable="false"
          src={user.photoUrl}
          alt="User Profile"
          className="size-10 rounded-full  select-none border"
        />
        <p className="font-bold">{user.username}</p>
      </button>
      <button className="hover:bg-gray-50/80 border transition-colors duration-300 rounded-full p-2 border-white hover:border-gray-100">
        <UserPlusIcon />
      </button>
    </header>
  );
}
