import { ticketModel } from '../models/ticket.model.js'

class TicketsManager {
  getTickets = (filters) => ticketModel.find(filters).populate('purchaser')

  createTicket = (ticketData) => {
    return ticketModel.create(ticketData)
  }
}

export { TicketsManager }