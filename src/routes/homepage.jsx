import { Edit, Search } from "lucide-react";
import { getColorById } from "../data/colors";
import { user as UserData } from "../data/user";
import { getContactById } from "../data/contacts";
import { useNavigate } from "react-router-dom";
import ChatsList from "../features/chats/ChatsList";

export default function Home() {
  const navigate = useNavigate();

  const user = UserData;

  function handleContactClick(contactId) {
    navigate(`/contacts/${contactId}`);
  }

  return (
    <div className="flex flex-col animate-in slide-in-from-left pt-10 gap-y-5 h-screen">
      <header className="flex justify-between items-center px-8">
        <div className="flex flex-col">
          <p className="text-xs font-light text-gray-500">
            Assalamu Alaik {user.username.split(" ")[0]},
          </p>
          <p className="font-bold text-lg">Chat App Message</p>
        </div>
        <Edit />
      </header>
      <nav className="pl-8 flex gap-5 w-full flex-none overflow-x-auto">
        <div className="flex flex-col cursor-pointer gap-2 items-center">
          <div className="flex flex-none items-center justify-center size-14 bg-gray-100/60  rounded-full">
            <Search />
          </div>
          <p className="text-xs">Search</p>
        </div>
        {user.contactsId.length > 0 &&
          user.contactsId.map((contactId) => {
            const contact = getContactById(contactId);
            const color = getColorById(contactId);

            return (
              <div
                key={contact.id}
                className="flex flex-col gap-2 items-center cursor-pointer"
                onClick={() => handleContactClick(contactId)}
              >
                <div
                  className={`relative flex flex-none items-center justify-center size-14 ${color[0]} rounded-full`}
                >
                  <p className={`${color[1]} font-medium`}>
                    {contact.username.split(" ")[0][0]}
                    {contact.username.split(" ")[1][0]}
                  </p>
                  {contact.status === "online" && (
                    <div className="absolute bg-green-500 rounded-full size-3 bottom-0 right-[2px] ring-white ring-[3px]"></div>
                  )}
                </div>
                <p className="text-xs">{contact.username.split(" ")[0]}</p>
              </div>
            );
          })}
      </nav>
      <div className="bg-gray-200 h-[1px]"></div>
      <ChatsList />
    </div>
  );
}
