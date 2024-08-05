export const getUserChatsByUserId = (chats, userId) => {
  const userChats = chats
    .filter((chat) => chat.participants.includes(userId))
    .map((chat) =>
      chat.participants.find((participant) => participant != userId)
    );

  return userChats;
};

export const getChatByParticipantsId = (chats, user1Id, user2Id) => {
  const chat = chats.find(
    (chat) =>
      chat.participants.includes(user1Id) && chat.participants.includes(user2Id)
  );

  return chat;
};
