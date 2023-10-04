import { userModel } from '../models/user.model.js'
class UsersManager {
  getUserBy = (param) => userModel.findOne(param)

  createUser = (userData) => {
    return userModel.create(userData)
  }

  updateUserBy = (filters, updates) => {
    return userModel.updateOne(filters, { $set: updates })
  }

  updateLastConnection= (uid) =>{
    return userModel.findByIdAndUpdate(uid, { lastConnection: new Date() })
  }
}

export { UsersManager }
