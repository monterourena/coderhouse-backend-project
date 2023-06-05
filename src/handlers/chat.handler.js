import { ChatService } from "../api/services/chat.service.js";
const chatService = new ChatService();

const chatHandler = (io, socket) => {
  const saveMessage = async (data) => {
    await chatService.createMessage(data);
    const messageLogs = await chatService.getMessages();
    io.emit("chat:messageLogs", messageLogs);
  };

  const newParticipant = (user) => {
    socket.broadcast.emit("chat:newConnection", user);
  };

  socket.on("chat:message", saveMessage);
  socket.on("chat:newParticipant", newParticipant);
};

export { chatHandler };
