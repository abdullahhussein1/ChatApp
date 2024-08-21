import React from "react";
import { UserPlusIcon } from "lucide-react";
import { useGetCurrentUserQuery } from "../features/api/apiSlice";

export default function HomePageHeader({
  onUserProfileClick,
  onAddContactClick,
}) {
  const { data: user } = useGetCurrentUserQuery();

  return (
    <header className="flex justify-between items-center px-6">
      <button
        onClick={onUserProfileClick}
        className="flex gap-2 items-center active:scale-95 hover:bg-gray-50/80 border  border-white hover:border-gray-100 transition-all p-2 rounded-2xl"
      >
        <img
          draggable="false"
          src={user.photoUrl}
          alt="User Profile"
          className="size-10 rounded-full flex-none select-none border"
        />
        <p className="font-bold">{user.username}</p>
      </button>
      <button
        onClick={onAddContactClick}
        className="hover:bg-gray-50/80 border active:scale-95 transition-all  rounded-full p-2 border-white hover:border-gray-100"
      >
        <UserPlusIcon />
      </button>
    </header>
  );
}
