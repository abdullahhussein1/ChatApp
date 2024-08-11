import { Edit, Search } from "lucide-react";
import { getColorById } from "../data/colors";
import { user as UserData } from "../data/user";
import { getContactById } from "../data/contacts";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatsList from "../features/chats/ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signedOut } from "../features/user/userSlice";
import { signOut } from "firebase/auth";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const navigate = useNavigate();
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isUserInfoModalShown, setIsUserInfoModalShown] = useState(false);
  const location = useLocation();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const user = UserData;

  function handleContactClick(contactId) {
    navigate(`/contacts/${contactId}`);
  }

  const handleSignOutClicked = () => {
    signOut();
    dispatch(signedOut());
  };

  return (
    <div className="relative bg-gray-50 px-5 h-dvh flex items-center justify-center">
      {isUserInfoModalShown && (
        <div
          onClick={() => setIsUserInfoModalShown(false)}
          className="flex items-center justify-center w-full h-full bg-white/25  z-50 absolute"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg justify-center items-center rounded-3xl shadow-2xl animate-in zoom-in-90 bg-white/80 backdrop-blur-lg p-5 w-2/3 z-50"
          >
            <div className="flex items-center justify-center">
              <img
                draggable="false"
                src={userr.photoUrl}
                alt="User Profile"
                className="size-20 select-none rounded-full border shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="font-bold">{userr.username}</p>
              <p className="text-sm opacity-70">{userr.email}</p>
            </div>
            <button
              onClick={handleSignOutClicked}
              className="w-full col-span-full font-medium bg-gray-400/10 border border-gray-200 hover:bg-gray-400/15 hover:tracking-tight transition-all rounded-2xl p-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
      <div className="flex md:grid w-full shadow-2xl shadow-gray-300 md:grid-cols-3 rounded-3xl overflow-clip">
        <div
          className={`flex flex-col col-span-full md:col-span-1 z-40 w-full h-[95dvh] bg-white duration-300 overflow-hidden pt-10 gap-y-5 ${
            isSmallScreen &&
            location.pathname.includes("/contacts/") &&
            "hidden"
          }`}
        >
          <header className="flex justify-between items-center px-6">
            <button
              onClick={() => setIsUserInfoModalShown(true)}
              className="flex gap-2 items-center hover:bg-gray-50/80 border duration-300 border-white hover:border-gray-100 transition-colors p-2 rounded-2xl"
            >
              <img
                draggable="false"
                src={userr.photoUrl}
                alt="User Profile"
                className="size-10 rounded-full  select-none border"
              />
              <p className="font-bold">{userr.username}</p>
            </button>
            <button className="hover:bg-gray-50/80 border transition-colors duration-300 rounded-full p-2 border-white hover:border-gray-100">
              <Edit />
            </button>
          </header>
          <nav className="pl-8 flex gap-5 w-full overflow-x-auto">
            <div className="flex flex-col cursor-pointer gap-2 items-center">
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
        <div
          className={`flex w-full md:col-span-2 rounded-r-3xl ${
            isSmallScreen &&
            !location.pathname.includes("/contacts/") &&
            "hidden"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
