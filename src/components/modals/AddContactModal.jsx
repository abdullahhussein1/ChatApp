import { CheckIcon, XIcon } from "lucide-react";
import {
  useAddContactMutation,
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useCreateChatMutation,
  useGetPendingContactsByUserIdQuery,
  useGetRequestedContactsByUserIdQuery,
} from "../../features/api/apiSlice";
import Divider from "../Divider";
import { RotatingLines } from "react-loader-spinner";

export default function AddContactModal({ isOpen, onBackgroundClick }) {
  const { data: user } = useGetCurrentUserQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: contacts = [] } = useGetContactsByUserIdQuery(user.id);
  const { data: pendingContacts = [] } = useGetPendingContactsByUserIdQuery(
    user.id
  );
  const { data: requestedContacts = [] } = useGetRequestedContactsByUserIdQuery(
    user.id
  );
  const [addContact, { isLoading }] = useAddContactMutation();
  const [createChat] = useCreateChatMutation();

  const handleAddContactClick = (contact) => {
    try {
      addContact({ userId: user.id, contact });
      createChat([user.id, contact.id]);
    } catch (error) {
      console.error(error.messaeg);
    }
  };

  const filteredUsers = users.filter(
    (usr) =>
      usr.id !== user.id &&
      !contacts.find((contact) => contact.id == usr.id) &&
      !pendingContacts.find((contact) => contact.id == usr.id) &&
      !requestedContacts.find((contact) => contact.id == usr.id)
  );

  const renderedRequestedContacts = requestedContacts.map((contact, i) => (
    <div key={contact.id} className="flex w-full flex-col">
      <div
        className={`flex gap-2 items-center ${i < users.length - 2 && "pb-3"}`}
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={contact.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
        </div>
        <p className="font-bold flex-1 text-sm">{contact.username}</p>
        <button
          onClick={() => handleAddContactClick(contact)}
          className="hover:bg-gray-50/80 font-semibold border active:scale-95 transition-all text-sm rounded-full px-3 hover:border-gray-100"
        >
          {isLoading ? (
            <RotatingLines
              width="25"
              strokeColor="black"
              animationDuration="0.75"
              strokeWidth="3"
            />
          ) : (
            "Undo"
          )}
        </button>
      </div>
      {i < filteredUsers.length - 1 && <Divider />}
    </div>
  ));

  const renderedPendingContacts = pendingContacts.map((contact, i) => (
    <div key={contact.id} className="flex w-full flex-col">
      <div
        className={`flex gap-2 items-center ${i < users.length - 2 && "pb-3"}`}
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={contact.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
        </div>
        <p className="font-bold flex-1 text-sm">{contact.username}</p>
        <button
          onClick={() => handleAddContactClick(contact)}
          className="hover:bg-gray-50/80 font-semibold border active:scale-95 transition-all text-sm rounded-full p-1 hover:border-gray-100"
        >
          <CheckIcon size={16} />
        </button>
        <button
          onClick={() => handleAddContactClick(contact)}
          className="hover:bg-gray-50/80 font-semibold border active:scale-95 transition-all text-sm rounded-full p-1 hover:border-gray-100"
        >
          <XIcon size={16} />
        </button>
      </div>
      {i < filteredUsers.length - 1 && <Divider />}
    </div>
  ));

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
        <p className="font-bold flex-1 text-sm">{user.username}</p>
        <button
          onClick={() => handleAddContactClick(user)}
          className="hover:bg-gray-50/80 font-semibold border active:scale-95 transition-all text-sm rounded-full px-3 hover:border-gray-100"
        >
          {isLoading ? (
            <RotatingLines
              width="25"
              strokeColor="black"
              animationDuration="0.75"
              strokeWidth="3"
            />
          ) : (
            "Connect"
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
        className="absolute flex gap-1 flex-col max-w-lg justify-center items-center rounded-3xl shadow-2xl animate-in zoom-in-90 bg-white/80 backdrop-blur-md p-5 w-3/4 z-50"
      >
        <p className="pb-6 text-xl font-medium">
          <span className="font-bold">Connect</span> with others
        </p>
        {renderedUsers.length == 0 && (
          <p className=" text-md">No available users</p>
        )}
        {renderedRequestedContacts}
        {renderedPendingContacts}
        {renderedUsers}
      </div>
    </div>
  );
}
