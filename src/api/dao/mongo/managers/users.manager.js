import { userModel } from '../models/user.model.js'
class UsersManager {
  getUserBy = (param) => userModel.findOne(param)

  getAllUsers = (projection) => userModel.find({}, projection).lean()

  deleteInactiveUsers = async (inactivityInMinutes) => {
    const triggerDate = new Date(Date.now() - 30 * inactivityInMinutes * 1000)    
    const inactiveUsers = await userModel.find({ lastConnection: { $lt: triggerDate } }, 'email')
    const emails = inactiveUsers.map(user => user.email)
    await userModel.deleteMany({ email: { $in: emails } })

    return emails
  }

  createUser = (userData) => {
    return userModel.create(userData)
  }

  updateUserBy = (filters, updates) => {
    return userModel.updateOne(filters, { $set: updates })
  }

  uploadDocuments = async (uid, documents) => {
    //If the document with the same name exists, it is overwritten. If it does not exist then it is appended to the document array.
    const user = await userModel.findById(uid)
    if (!user) throw new Error('UserNotFound')

    documents.forEach((newDoc) => {
      const existingDocIndex = user.documents.findIndex((doc) => doc.name === newDoc.name)
      if (existingDocIndex !== -1) {
        user.documents[existingDocIndex] = newDoc
      } else {
        user.documents.push(newDoc)
      }
    })

    return user.save()
  }

  updateUserRole = (uid, role) => {
    return userModel.findByIdAndUpdate(uid, { role })
  }

  updateLastConnection = (uid) => {
    return userModel.findByIdAndUpdate(uid, { lastConnection: new Date() })
  }
}

export { UsersManager }
