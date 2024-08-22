import { useNavigate } from "react-router-dom";

import {
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
} from "../api/apiSlice";
import { RotatingLines } from "react-loader-spinner";

export default function ChatsList() {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();

  const { data: contacts = [], isLoading } = useGetContactsByUserIdQuery(
    user.id
  );

  const ChatsRendered =
    contacts.length > 0 &&
    contacts.map((contact) => {
      function handleChatClick(contactId) {
        navigate(`/contacts/${contactId}`);
      }

      return (
        <div
          key={contact.id}
          className="flex animate-in items-center active:scale-95 transition-all fade-in-0 hover:bg-gray-50/80 border border-white hover:border-gray-100 rounded-2xl cursor-pointer gap-3 px-3 py-2 w-full"
          onClick={() => handleChatClick(contact.id)}
        >
          <img
            draggable="false"
            src={contact.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
          <div className="flex flex-col">
            <p className="font-bold">{contact.username}</p>
            <p className="font-thin text-xs">الحمدلله رب العالمین</p>
          </div>
        </div>
      );
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <RotatingLines
          width="25"
          strokeColor="black"
          animationDuration="0.75"
          strokeWidth="3"
        />
      </div>
    );
  }

  if (contacts.length == 0) {
    return <p>No available chats</p>;
  }

  return (
    <div className="flex flex-col px-3 gap-3 overflow-y-auto">
      {ChatsRendered}
    </div>
  );
}
