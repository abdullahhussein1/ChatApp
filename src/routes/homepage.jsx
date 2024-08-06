import { Edit, Search } from "lucide-react";
import { getColorById } from "../data/colors";
import { user as UserData } from "../data/user";
import { getContactById } from "../data/contacts";
import { useNavigate } from "react-router-dom";
import ChatsList from "../features/chats/ChatsList";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const userr = useSelector((state) => state.user);

  const user = UserData;

  function handleContactClick(contactId) {
    navigate(`/contacts/${contactId}`);
  }

  return (
    <div className="flex flex-col animate-in slide-in-from-left duration-300 pt-10 gap-y-5 h-screen">
      <header className="flex justify-between items-center px-6">
        <button className="flex gap-2 items-center hover:bg-gray-50/60 border duration-300 border-white hover:border-gray-100 transition-colors p-2 rounded-2xl">
          <img
            src={userr.photoUrl}
            alt="User Profile"
            className="size-10 rounded-full border"
          />
          <p className="font-bold">{userr.username}</p>
        </button>

        <button className="hover:bg-gray-50/60 border transition-colors duration-300 rounded-full p-2 border-white hover:border-gray-100">
          <Edit />
        </button>
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
                    {contact?.username.split(" ")[0][0]}
                    {contact?.username.split(" ")[1][0]}
                  </p>
                  {contact.status === "online" && (
                    <div className="absolute bg-green-500 rounded-full size-3 bottom-0 right-[2px] ring-white ring-[3px]"></div>
                  )}
                </div>
                <p className="text-xs">{contact?.username.split(" ")[0]}</p>
              </div>
            );
          })}
      </nav>
      <div className="bg-gray-200 h-[1px]"></div>
      <ChatsList />
    </div>
  );
}
