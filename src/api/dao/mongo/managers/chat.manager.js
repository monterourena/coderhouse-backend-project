import { messageModel } from "../models/message.model.js";

class ChatManager {
  createMessage = (data) => {
    return messageModel.create(data);
  };

  getMessages = () => {
    return messageModel.find();
  };
}

export { ChatManager };
