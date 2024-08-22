import { useNavigate } from "react-router-dom";
import { getColorById } from "../../data/colors";
import { getContactById } from "../../data/contacts";
import { user as usr } from "../../data/user";
import { PinIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { getChatByParticipantsId, getUserChatsByUserId } from "./chats";
import { getLastMessage } from "../../data/messages";
import {
  useGetChatsByUserIdQuery,
  useGetCurrentUserQuery,
} from "../api/apiSlice";
import { RotatingLines } from "react-loader-spinner";

export default function ChatsList() {
  const navigate = useNavigate();
  const chts = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const { data: user } = useGetCurrentUserQuery();

  const userChats = getUserChatsByUserId(chts, usr.id);

  const { data: chats = [], isLoading } = useGetChatsByUserIdQuery(user.id);
  console.log(chats);

  const ChatsRendered =
    userChats.length > 0 &&
    userChats.map((contactId) => {
      const color = getColorById(contactId);
      const contact = getContactById(contactId);
      const chat = getChatByParticipantsId(chts, usr.id, contactId);

      const lastMessage = getLastMessage(messages, chat.id);

      function handleChatClick(contactId) {
        navigate(`/contacts/${contactId}`);
      }

      return (
        <div
          key={contact.id}
          className="flex animate-in active:scale-95 transition-all fade-in-0  justify-between hover:bg-gray-50/80 border border-white hover:border-gray-100 rounded-2xl cursor-pointer gap-4 px-3 py-2 w-full"
          onClick={() => handleChatClick(contactId)}
        >
          <div
            className={`relative flex flex-none items-center justify-center size-14 ${color[0]} rounded-full`}
          >
            <p className={`${color[1]} font-bold tracking-wider`}>
              {contact.username.split(" ")[0][0]}
              {contact.username.split(" ")[1][0]}
            </p>
            {contact.status === "online" && (
              <div className="absolute bg-green-500 rounded-full size-3 bottom-0 right-[2px] ring-white ring-[3px]"></div>
            )}
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <p className="font-bold text-md">{contact.username}</p>
            <p className="text-xs font-light text-gray-500 w-full">
              {lastMessage.senderId == usr.id
                ? "You: "
                : lastMessage &&
                  getContactById(lastMessage.senderId)?.username.split(" ")[0] +
                    ": "}
              {lastMessage.content ||
                `Say salamu alaik to ${contact.username.split(" ")[0]}`}
            </p>
          </div>
          <div className="flex flex-col gap-1 text-gray-500 items-end">
            <p className="text-xs font-light ">21:23</p>
            <PinIcon size={16} />
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

  return (
    <div className="flex flex-col px-3 gap-3 overflow-y-auto">
      {ChatsRendered}
    </div>
  );
}
