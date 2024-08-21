import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import {
  useGetCurrentUserQuery,
  useSignOutMutation,
} from "../../features/api/apiSlice";

export default function UserInfoModal({ isOpen, onBackgroundClick }) {
  const { data: user } = useGetCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();

  const handleSignOutClicked = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={onBackgroundClick}
      className={`flex items-center justify-center w-full h-full bg-white/25  z-50 absolute ${
        !isOpen && "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg justify-center items-center rounded-3xl shadow-2xl animate-in zoom-in-90 bg-white/80 backdrop-blur-md p-5 w-3/4 z-50"
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={user.photoUrl}
            alt="User Profile"
            className="size-20 select-none flex-none rounded-full border shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-1 items-center md:items-start">
          <p className="font-bold">{user.username}</p>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
        <button
          onClick={handleSignOutClicked}
          className="w-full col-span-full font-medium active:scale-95 bg-gray-400/10 border border-gray-200 hover:bg-gray-400/15 hover:tracking-tight transition-all rounded-2xl p-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
