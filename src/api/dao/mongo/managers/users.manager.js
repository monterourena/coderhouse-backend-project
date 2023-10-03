import { userModel } from '../models/user.model.js'
class UsersManager {
  getUserBy = (param) => userModel.findOne(param)

  createUser = (userData) => {
    return userModel.create(userData)
  }

  updateUserBy = (filters, updates) => {
    return userModel.updateOne(filters, { $set: updates })
  }
}

export { UsersManager }
