import { NavLink } from "react-router-dom";
import {
  useGetChatByParticipantsIdQuery,
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
  useGetMessagesByChatIdQuery,
} from "../api/apiSlice";
import { RotatingLines } from "react-loader-spinner";

export default function ChatsList() {
  const { data: user } = useGetCurrentUserQuery();
  const { data: contacts = [], isLoading } = useGetContactsByUserIdQuery(
    user?.id
  );

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

  if (contacts.length === 0) {
    return <p>No available chats</p>;
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
  const { data: chat } = useGetChatByParticipantsIdQuery({
    userId: currentUser?.id,
    contactId: contact?.id,
  });

  const { data: messages, isLoading: isMessagesLoading } =
    useGetMessagesByChatIdQuery(chat?.id);

  const lastMessage =
    !isMessagesLoading && messages?.length > 0
      ? messages[messages.length - 1]
      : "No messages yet";

  return (
    <NavLink
      to={`/contacts/${contact.id}`}
      className={({ isActive }) =>
        `flex animate-in items-center active:scale-95 transition-all fade-in-0 hover:bg-gray-50/80 border border-white hover:border-gray-100 rounded-2xl gap-3 px-3 py-2 w-full ${
          isActive && "bg-gray-50 border-gray-100"
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
          {isMessagesLoading ? "Loading..." : lastMessage.content}
        </p>
      </div>
    </NavLink>
  );
}
