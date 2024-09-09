import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import {
  useGetContactsByUserIdQuery,
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useCreateChatMutation,
  useGetPendingContactsByUserIdQuery,
  useGetRequestedContactsByUserIdQuery,
  useRequestConnectionMutation,
  useRejectConnectionMutation,
  useAcceptConnectionMutation,
  useUndoConnectionMutation,
} from "../../features/api/apiSlice";
import Divider from "../Divider";

export default function AddContactModal({ isOpen, onBackgroundClick }) {
  const { data: user } = useGetCurrentUserQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: contacts = [] } = useGetContactsByUserIdQuery(user.id);
  const { data: pendingConnections = [] } = useGetPendingContactsByUserIdQuery(
    user.id
  );
  const { data: requestedConnections = [] } =
    useGetRequestedContactsByUserIdQuery(user.id);
  const [requestConnection] = useRequestConnectionMutation();
  const [acceptConnection] = useAcceptConnectionMutation();
  const [rejectConnection] = useRejectConnectionMutation();
  const [undoConnection] = useUndoConnectionMutation();
  const [createChat] = useCreateChatMutation();

  const handleConnectClick = (contact) => {
    try {
      requestConnection({ user, contact });
    } catch (error) {
      console.error(error.messaeg);
    }
  };
  const handleAcceptConnectionClick = (contact) => {
    try {
      acceptConnection({ user, contact });
      createChat([user.id, contact.id]);
    } catch (error) {
      console.error(error.messaeg);
    }
  };
  const handleRejectConnectionClick = (contact) => {
    try {
      rejectConnection({ user, contact });
    } catch (error) {
      console.error(error.messaeg);
    }
  };
  const handleUndoConnectionClick = (contact) => {
    try {
      undoConnection({ user, contact });
    } catch (error) {
      console.error(error.messaeg);
    }
  };

  const filteredUsers = users.filter(
    (usr) =>
      usr.id !== user.id &&
      !contacts.find((contact) => contact.id == usr.id) &&
      !pendingConnections.find((contact) => contact.id == usr.id) &&
      !requestedConnections.find((contact) => contact.id == usr.id)
  );

  const renderedPendingConnections = pendingConnections.map((contact, i) => (
    <div key={contact.id} className="flex w-full flex-col">
      <div
        className={`flex gap-2 items-center ${i < users.length - 2 && "pb-1"}`}
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={contact.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
        </div>
        <p className="font-bold flex-1 text-sm  truncate">{contact.username}</p>
        <button
          onClick={() => handleUndoConnectionClick(contact)}
          className="flex gap-1 items-center text-red-900 font-medium border border-red-400  active:scale-95 transition-all text-xs rounded-full px-2 py-1 hover:bg-red-50/50"
        >
          <XIcon size={16} />
          <p>undo</p>
        </button>
      </div>
      {i < pendingConnections.length - 1 && <Divider />}
    </div>
  ));

  const renderedRequestedConnections = requestedConnections.map(
    (contact, i) => (
      <div key={contact.id} className="flex w-full flex-col">
        <div
          className={`flex gap-2 items-center ${
            i < users.length - 2 && "pb-1"
          }`}
        >
          <div className="flex items-center justify-center">
            <img
              draggable="false"
              src={contact.photoUrl}
              alt="User Profile"
              className="size-10 flex-none select-none rounded-full border shadow-2xl"
            />
          </div>
          <p className="font-bold flex-1 text-sm truncate">
            {contact.username}
          </p>
          <button
            onClick={() => handleAcceptConnectionClick(contact)}
            className="flex items-center gap-1 font-medium border border-green-400 text-green-700 active:scale-95 transition-all text-xs rounded-full px-2 py-1 hover:bg-green-50/50"
          >
            <CheckIcon size={16} />
            <p>accept</p>
          </button>
          <button
            onClick={() => handleRejectConnectionClick(contact)}
            className="flex gap-1 items-center text-red-900 font-medium border border-red-400  active:scale-95 transition-all text-xs rounded-full px-2 py-1 hover:bg-red-50/50"
          >
            <XIcon size={16} />
            <p>reject</p>
          </button>
        </div>
        {i < requestedConnections.length - 1 && <Divider />}
      </div>
    )
  );

  const renderedUsers = filteredUsers.map((user, i) => (
    <div key={user.id} className="flex w-full flex-col">
      <div
        className={`flex gap-2 items-center ${i < users.length - 2 && "pb-1"}`}
      >
        <div className="flex items-center justify-center">
          <img
            draggable="false"
            src={user.photoUrl}
            alt="User Profile"
            className="size-10 flex-none select-none rounded-full border shadow-2xl"
          />
        </div>
        <p className="font-bold flex-1 text-sm truncate">{user.username}</p>
        <button
          onClick={() => handleConnectClick(user)}
          className="flex gap-1 items-center hover:bg-gray-50/80 font-medium border active:scale-95 transition-all text-xs rounded-full px-2 py-1 hover:border-gray-100"
        >
          <PlusIcon size={16} /> <p>connect</p>
        </button>
      </div>
      {i < filteredUsers.length - 1 && <Divider />}
    </div>
  ));

  return (
    <div
      onClick={onBackgroundClick}
      className={`flex items-center justify-center w-full h-full bg-white/25  z-50 absolute  ${
        !isOpen && "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute flex gap-1 flex-col max-w-lg justify-center items-center rounded-3xl shadow-2xl animate-in zoom-in-90 bg-white/80 backdrop-blur-md p-5 w-11/12 z-50"
      >
        <p className="pb-6 text-xl font-medium">
          <span className="font-bold">Connect</span> with others
        </p>
        {renderedUsers.length == 0 && (
          <p className="text-md">No available users</p>
        )}
        <div className="flex flex-col w-full h-96 overflow-y-auto gap-1 rounded-2xl p-1">
          {renderedRequestedConnections.length > 0 && (
            <p className="flex w-full pb-2">Requested Connections</p>
          )}
          {renderedRequestedConnections}
          {renderedPendingConnections.length > 0 && (
            <p className="flex w-full pb-2">Pending Connections</p>
          )}
          {renderedPendingConnections}
          {(renderedPendingConnections.length > 0 ||
            renderedRequestedConnections.length > 0) && (
            <p className="flex w-full pb-2">Other Connections</p>
          )}
          {renderedUsers}
        </div>
      </div>
    </div>
  );
}
