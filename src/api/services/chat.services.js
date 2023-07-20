export class ChatServices {
  constructor(manager) {
    this.manager = manager
  }
  createMessage = (data) => {
    return this.manager.createMessage(data)
  }
  getMessages = () => {
    return this.manager.getMessages
  }
}
