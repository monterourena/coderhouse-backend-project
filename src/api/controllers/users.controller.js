import { DTOs } from '../dto/dtos.js'
import { Services } from '../services/services.js'

const usersService = Services.users
export class UsersController {
  getUsersBy = async (req, res) => {
    res.sendSuccess()
  }

  uploadDocuments = async (req, res) => {
    try {
      const { uid } = req.params
      const documents = req.files.map((file) => {
        return DTOs.file(file).userDocument
      })
      const response = await usersService.uploadDocuments(uid, documents)
      if (!response) return res.sendBadRequest({ message: 'Invalid User ID' })

      res.sendSuccess({ message: 'Documents uploaded' })
    } catch (error) {
      if (error?.name === 'CastError' || error?.message === 'UserNotFound'){
        return res.sendBadRequest({ message: 'Invalid User ID' })}

      return res.sendInternalServerError({ message: error })
    }
  }
}
