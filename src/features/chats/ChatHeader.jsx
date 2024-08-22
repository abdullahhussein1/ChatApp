import { ChevronLeft, InfoIcon, PhoneIcon, VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatHeader({ contact }) {
  const navigate = useNavigate();

  return (
    <header className="absolute animate-in slide-in-from-top-full  duration-300 z-50 w-full flex bg-white/90 backdrop-blur-xl justify-between items-center gap-2 p-6 pt-10">
      <div className="pr-2 cursor-pointer" onClick={() => navigate("/")}>
        <ChevronLeft />
      </div>
      <div className="flex items-center justify-center">
        <img
          draggable="false"
          src={contact.photoUrl}
          alt="User Profile"
          className="size-10 flex-none select-none rounded-full border shadow-2xl"
        />
      </div>
      <p className="font-bold flex-1 text-md">{contact.username}</p>
      <button className="hover:bg-gray-50/80 border active:scale-95 transition-all rounded-full p-1 border-white hover:border-gray-100">
        <InfoIcon />
      </button>
    </header>
  );
}
