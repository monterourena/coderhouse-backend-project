import { DTOs } from '../dto/dtos.js'
import { Services } from '../services/services.js'
import userUtils from '../../utils/users.utils.js'
import { AUTH } from '../../constants/constants.js'

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
      if (error?.name === 'CastError' || error?.message === 'UserNotFound') {
        return res.sendBadRequest({ message: 'Invalid User ID' })
      }

      return res.sendInternalServerError({ message: error })
    }
  }

  togglePremiumRole = async (req, res) => {
    try {
      const { uid } = req.params
      const user = await usersService.getUserBy({ _id: uid })
      if (!user) return res.sendBadRequest({ message: 'Invalid User ID' })
      if (user.role === AUTH.ROLES.PREMIUM) {
        await usersService.updateUserRole(uid, AUTH.ROLES.USER)
        return res.sendSuccess({ message: 'Role Updated' })
      }
      const hasDocuments = userUtils(user).hasValidDocuments
      if (!hasDocuments)
        return res.sendForbidden({message: 'The user must upload the required documents to perform a role upgrade.'})
      await usersService.updateUserRole(uid, AUTH.ROLES.PREMIUM)
      res.sendSuccess({ message: 'Role Updated' })
    } catch (error) {
      if (error?.name === 'CastError') {
        return res.sendBadRequest({ message: 'Invalid User ID' })
      }

      return res.sendInternalServerError({message: error})
    }
  }
}
