import { messageModel } from "../models/message.model.js";

class ChatService {
  createMessage = (data) => {
    return messageModel.create(data);
  };

  getMessages = () => {
    return messageModel.find();
  };
}

export { ChatService };
