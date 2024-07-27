import { getLastMessage } from "./messages";

export const conversations = [
  {
    id: 1,
    participants: [1, 2],
    lastMessage: getLastMessage(1),
    timestamp: null,
  },
  {
    id: 2,
    participants: [3, 1],
    lastMessage: getLastMessage(2),
    timestamp: null,
  },
  {
    id: 3,
    participants: [4, 1],
    lastMessage: getLastMessage(3),
    timestamp: null,
  },
];

export function getConversationsByParticipantsId(user1Id, user2Id) {
  const conversation = conversations.find(
    (conversation) =>
      conversation.participants.includes(user1Id) &&
      conversation.participants.includes(user2Id)
  );

  return conversation;
}
