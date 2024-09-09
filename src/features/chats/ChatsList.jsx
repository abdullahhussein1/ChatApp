import { NavLink } from "react-router-dom";
import {
  useGetChatByParticipantsIdQuery,
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
  useGetMessagesByChatIdQuery,
} from "../api/apiSlice";
import { RotatingLines } from "react-loader-spinner";
import { format } from "date-fns";
import logo from "../../assets/favicon.svg";
import { UserPlusIcon } from "lucide-react";

export default function ChatsList() {
  const { data: user } = useGetCurrentUserQuery();
  const { data: contacts = [], isLoading: isContactsLoading } =
    useGetContactsByUserIdQuery(user?.id);

  if (isContactsLoading) {
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

  if (!isContactsLoading && contacts.length === 0) {
    return (
      <div className="flex gap-3 items-start justify-center py-5 w-full h-full">
        <UserPlusIcon />
        <p>
          Start <span className="font-semibold">Connecting</span> with others
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-3 gap-3 overflow-y-auto">
      {contacts.map((contact) => (
        <ChatItem key={contact.id} contact={contact} currentUser={user} />
      ))}
    </div>
  );
}

function ChatItem({ contact, currentUser }) {
  const { data: chat, isLoading: isChatLoading } =
    useGetChatByParticipantsIdQuery({
      userId: currentUser?.id,
      contactId: contact?.id,
    });

  const { data: messages, isLoading: isMessagesLoading } =
    useGetMessagesByChatIdQuery(chat?.id);

  if (isChatLoading || isMessagesLoading)
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

  const lastMessage = messages?.[messages.length - 1];

  return (
    <NavLink
      to={`/contacts/${contact.id}`}
      className={({ isActive }) =>
        `flex animate-in items-center active:scale-95 transition-all fade-in-0 hover:bg-gray-50/80 border border-white hover:border-gray-100 rounded-2xl gap-3 px-3 py-2 w-full ${
          isActive ? "bg-gray-50 border-gray-100" : ""
        }`
      }
    >
      <img
        src={contact.photoUrl}
        alt="User Profile"
        className="size-11 md:size-12 flex-none select-none rounded-full border shadow-2xl"
      />
      <div className="flex flex-col flex-1 truncate">
        <p className="w-fit font-bold">{contact.username}</p>
        <p className="font-thin flex-1 text-xs truncate">
          {lastMessage?.content || "New Connection"}
        </p>
      </div>
      <p className="text-xs self-start text-gray-500">
        {lastMessage?.sendedAt
          ? format(new Date(lastMessage.sendedAt), "h:mm a")
          : ""}
      </p>
    </NavLink>
  );
}
