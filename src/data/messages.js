export const messages = [
  {
    id: 1,
    chatId: 1,
    senderId: 1,
    content: "Assalamu alaikum",
    timestamp: new Date(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    chatId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    chatId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    chatId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date(),
  },
  {
    id: 4,
    chatId: 1,
    senderId: 2,
    content: "alhamdulillah, waz3t kwa atu?",
    timestamp: new Date(),
  },
  {
    id: 5,
    chatId: 1,
    senderId: 1,
    content: "لە فەزڵی پەروەردگار زۆر باشم بەڵام خوشک و براکانم لە ئازاردان",
    timestamp: new Date(),
  },
  {
    id: 6,
    chatId: 1,
    senderId: 2,
    content: "خوای گەورە دەرووی خێریان لێبکاتەوە، بەڕاستی ئازارێکی قورسە",
    timestamp: new Date(),
  },
  {
    id: 7,
    chatId: 2,
    senderId: 3,
    content: "خوای گەورە دەرووی خێریان لێبکاتەوە، بەڕاستی ئازارێکی قورسە",
    timestamp: new Date(),
  },
  {
    id: 2,
    chatId: 2,
    senderId: 1,
    content: "خوای گەورە دەرووی خێریان لێبکاتەوە، بەڕاستی ئازارێکی قورسە",
    timestamp: new Date(),
  },
];

export function getLastMessage(chatId) {
  const currentchatMessages = messages.filter(
    (message) => message.chatId === chatId
  );

  const lastMessage = currentchatMessages[currentchatMessages.length - 1] || "";

  return lastMessage;
}

export function getMessagesBychatId(chatId) {
  const filteredMessages = messages.filter(
    (message) => message.chatId === chatId
  );

  return filteredMessages;
}
