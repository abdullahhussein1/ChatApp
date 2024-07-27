export const messages = [
  {
    id: 1,
    conversationId: 1,
    senderId: 1,
    content: "Assalamu alaikum",
    timestamp: new Date(),
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 5,
    conversationId: 1,
    senderId: 1,
    content: "لە فەزڵی پەروەردگار زۆر باشم بەڵام خوشک و براکانم لە ئازاردان",
    timestamp: new Date(),
  },
  {
    id: 6,
    conversationId: 1,
    senderId: 2,
    content: "خوای گەورە دەرووی خێریان لێبکاتەوە، بەڕاستی ئازارێکی قورسە",
    timestamp: new Date(),
  },
];

export function getLastMessage(conversationId) {
  const currentConversationMessages = messages.filter(
    (message) => message.conversationId === conversationId
  );

  const lastMessage =
    currentConversationMessages[currentConversationMessages.length - 1];

  return lastMessage;
}

export function getMessagesByConversationId(conversationId) {
  const filteredMessages = messages.filter(
    (message) => message.conversationId === conversationId
  );

  return filteredMessages;
}
