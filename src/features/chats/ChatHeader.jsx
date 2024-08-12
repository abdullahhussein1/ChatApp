import { ChevronLeft, PhoneIcon, VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getColorById } from "../../data/colors";

export default function ChatHeader({ contact }) {
  const navigate = useNavigate();

  const color = getColorById(contact.id);

  return (
    <header className="absolute animate-in slide-in-from-top-full  duration-300 z-50 w-full flex bg-white/90 backdrop-blur-xl justify-between items-center gap-2 p-6 pt-10">
      <div className="pr-2 cursor-pointer" onClick={() => navigate("/")}>
        <ChevronLeft />
      </div>
      <div
        className={`relative flex flex-none items-center justify-center size-10 ${color[0]} rounded-full`}
      >
        <p className={`${color[1]} text-sm font-medium`}>
          {contact.username.split(" ")[0][0]}
          {contact.username.split(" ")[1][0]}
        </p>
        {contact.status === "online" && (
          <div className="absolute bg-green-500 rounded-full size-2 bottom-0 right-[2px] ring-white ring-2"></div>
        )}
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-bold text-md">{contact.username}</p>
        <p className="text-xs font-light text-green-500">Online</p>
      </div>
      <VideoIcon className="mr-3" />
      <PhoneIcon />
    </header>
  );
}
