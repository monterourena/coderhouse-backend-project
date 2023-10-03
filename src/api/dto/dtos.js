import CurrentUserDTO from './current-user.dto.js'
import NewProductDTO from './product.dto.js'
import TicketsDTO from './ticket.dto.js'

export const DTOs = {
    currentUser: (user) => new CurrentUserDTO(user),
    newProduct: (product) => new NewProductDTO(product),
    ticket: (cart, cartOwner) => new  TicketsDTO(cart, cartOwner)
}