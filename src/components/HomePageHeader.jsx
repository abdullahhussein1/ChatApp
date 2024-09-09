import React from "react";
import { UsersIcon } from "lucide-react";
import {
  useGetCurrentUserQuery,
  useGetRequestedContactsByUserIdQuery,
} from "../features/api/apiSlice";

export default function HomePageHeader({
  onUserProfileClick,
  onAddContactClick,
}) {
  const { data: user } = useGetCurrentUserQuery();
  const { data: requestedConnections = [] } =
    useGetRequestedContactsByUserIdQuery(user.id);

  return (
    <header className="flex justify-between items-center px-4">
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
        <p className="font-bold truncate">{user.username}</p>
      </button>
      <button
        onClick={onAddContactClick}
        className="relative hover:bg-gray-50/80 border active:scale-95 transition-all  rounded-full p-2 border-white hover:border-gray-100"
      >
        {requestedConnections.length > 0 && (
          <div className="flex items-center justify-center text-white text-xs size-4 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500 animate-in zoom-in-50 absolute top-0 -right-1">
            {requestedConnections.length}
          </div>
        )}
        <UsersIcon />
      </button>
    </header>
  );
}
