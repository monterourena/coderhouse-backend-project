
export class TicketsServices{
    constructor(manager){
        this.manager = manager
    }
    getTickets = (filters) => {
        return this.manager.getTickets(filters)
    }
    createTicket = (ticketData) => {
        return this.manager.createTicket(ticketData)
    }
}