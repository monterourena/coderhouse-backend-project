import { userModel } from '../models/user.model.js'
class UsersManager {
  getUserBy = (param) => userModel.findOne(param)

  createUser = (userData) => {
    return userModel.create(userData)
  }
}

export { UsersManager }
