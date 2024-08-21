import {
  useAddContactMutation,
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
  useGetUsersQuery,
} from "../../features/api/apiSlice";
import Divider from "../Divider";
import { PlusIcon } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";

export default function AddContactModal({ isOpen, onBackgroundClick }) {
  const { data: user } = useGetCurrentUserQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: contacts = [] } = useGetContactsByUserIdQuery(user.id);
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleAddContactClick = async (contact) => {
    try {
      await addContact({ userId: user.id, contact });
    } catch (error) {
      console.error(error.messaeg);
    }
  };

  const filteredUsers = users.filter(
    (usr) =>
      usr.id !== user.id && !contacts.find((contact) => contact.id == usr.id)
  );

  const renderedUsers = filteredUsers.map((user, i) => (
    <div key={user.id} className="flex w-full flex-col">
      <div
        className={`flex gap-2 items-center ${i < users.length - 2 && "pb-3"}`}
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={user.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
        </div>
        <div className="flex flex-col flex-1 gap-1 md:items-start">
          <p className="font-bold text-sm">{user.username}</p>
          <p className="text-xs opacity-70">{user.email}</p>
        </div>
        <button
          onClick={() => handleAddContactClick(user)}
          className="hover:bg-gray-50/80 border active:scale-95 transition-all  rounded-full p-1 border-white hover:border-gray-100"
        >
          {isLoading ? (
            <RotatingLines
              width="25"
              strokeColor="black"
              animationDuration="0.75"
              strokeWidth="3"
            />
          ) : (
            <PlusIcon />
          )}
        </button>
      </div>
      {i < filteredUsers.length - 1 && <Divider />}
    </div>
  ));

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
        className="absolute flex gap-2 flex-col max-w-lg justify-center items-center rounded-3xl shadow-2xl animate-in zoom-in-90 bg-white/80 backdrop-blur-md p-5 w-3/4 z-50"
      >
        <p className="pb-3 text-xl font-semibold">Users List</p>
        {renderedUsers}
      </div>
    </div>
  );
}
