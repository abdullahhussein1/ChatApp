import { Search } from "lucide-react";
import { getColorById } from "../data/colors";
import { getContactById } from "../data/contacts";
import { user as userDate } from "../data/user";
import { useNavigate } from "react-router-dom";

export default function ContactsList() {
  const navigate = useNavigate();
  const user = userDate;

  function handleContactClick(contactId) {
    navigate(`/contacts/${contactId}`);
  }

  return (
    <nav className="pl-8 flex gap-5 w-full flex-none overflow-x-auto">
      <div className="flex flex-col cursor-pointer active:scale-95 transition-all gap-2 items-center">
        <div className="flex items-center justify-center size-14 bg-gray-100/60  rounded-full">
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
              className="flex flex-col gap-2 active:scale-95 transition-all items-center cursor-pointer"
              onClick={() => handleContactClick(contactId)}
            >
              <div
                className={`relative flex flex-none items-center justify-center size-14 ${color[0]} rounded-full`}
              >
                <p className={`${color[1]} font-bold tracking-wider`}>
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
  );
}
