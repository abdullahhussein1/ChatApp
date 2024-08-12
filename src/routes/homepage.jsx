import { Outlet, useLocation } from "react-router-dom";
import ChatsList from "../features/chats/ChatsList";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import UserInfoModal from "../components/UserInfoModal";
import HomePageHeader from "../components/HomePageHeader";
import Divider from "../components/Divider";
import ContactsList from "../components/ContactsList";

export default function Home() {
  const location = useLocation();
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="relative bg-gray-50 px-3 md:px-5 h-dvh flex items-center justify-center">
      <UserInfoModal
        isOpen={isUserInfoModalOpen}
        onBackgroundClick={() => setIsUserInfoModalOpen(false)}
      />
      <div className="flex md:grid w-full shadow-2xl max-w-6xl max-h-[900px] shadow-gray-300 md:grid-cols-3 rounded-3xl overflow-clip">
        <div
          className={`flex flex-col col-span-full md:col-span-1 z-40 w-full h-[98dvh] md:h-[95dvh] bg-white duration-300 overflow-hidden pt-10 gap-y-5 ${
            isSmallScreen &&
            location.pathname.includes("/contacts/") &&
            "hidden"
          }`}
        >
          <HomePageHeader
            onUserProfileClick={() => setIsUserInfoModalOpen(true)}
          />
          <ContactsList />
          <Divider />
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
