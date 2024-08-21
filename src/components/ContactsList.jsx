import { Search } from "lucide-react";
import { getColorById } from "../data/colors";
import { getContactById } from "../data/contacts";
import { user as userDate } from "../data/user";
import { useNavigate } from "react-router-dom";
import {
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
} from "../features/api/apiSlice";

export default function ContactsList() {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
  const { data: contacts = [] } = useGetContactsByUserIdQuery(user.id);

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
      {contacts.length > 0 &&
        contacts.map((contact) => {
          return (
            <div
              key={contact.id}
              className="flex flex-col gap-2 active:scale-95 transition-all items-center cursor-pointer"
              onClick={() => handleContactClick(contact.id)}
            >
              <img
                draggable="false"
                src={contact.photoUrl}
                alt="User Profile"
                className="size-14 rounded-full flex-none select-none border"
              />
              <p className="text-xs">{contact.username.split(" ")[0]}</p>
            </div>
          );
        })}
    </nav>
  );
}
