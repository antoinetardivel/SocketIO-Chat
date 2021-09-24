import { IMessage } from "../types/messages";

export const serializeMessage = (message: IMessage) => {
  if (typeof message.value != "string") {
    message.value = "";
  }
  if (typeof message.user.name != "string") {
    message.user.name = "";
  }
  return message;
};

export const serializeMessages = (messages: IMessage[]) => {
  for (let i = 0; i < messages.length; i++) {
    messages[i] = serializeMessage(messages[i]);
  }
  return messages;
};
