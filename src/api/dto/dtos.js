import CurrentUserDTO from './current-user.dto.js'

export const DTOs = {
    currentUser: (user) => new CurrentUserDTO(user)
}