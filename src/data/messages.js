export function getLastMessage(messages, chatId) {
  const currentchatMessages = messages.filter(
    (message) => message.chatId === chatId
  );

  const lastMessage = currentchatMessages[currentchatMessages.length - 1] || "";

  return lastMessage;
}

export function getMessagesBychatId(messages, chatId) {
  const filteredMessages = messages.filter(
    (message) => message.chatId === chatId
  );

  return filteredMessages;
}
