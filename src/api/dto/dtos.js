import UserDTO from './user.dto.js'
import NewProductDTO from './product.dto.js'
import TicketsDTO from './ticket.dto.js'
import FileDTO from './file.dto.js'

export const DTOs = {
    user: (user) => new UserDTO(user),
    newProduct: (product) => new NewProductDTO(product),
    ticket: (cart, cartOwner) => new  TicketsDTO(cart, cartOwner),
    file: (file) => new FileDTO(file)
}