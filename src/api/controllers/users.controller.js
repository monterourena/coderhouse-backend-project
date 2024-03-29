import { DTOs } from '../dto/dtos.js'
import { Services } from '../services/services.js'
import userUtils from '../../utils/users.utils.js'
import { AUTH } from '../../constants/constants.js'

const usersService = Services.users
const ms = Services.mailing
export class UsersController {
  getAllUsers = async (req, res) => {
    let users = await usersService.getAllUsers('email first_name role')
    users = users.map((user) => {
      return DTOs.user(user).nameEmailRole
    })
    res.sendSuccess({ data: users })
  }

  deleteInactiveUsers = async (req, res) => {
    const INACTIVITY_IN_MINUTES = 1
    const deletedUsersEmails = await usersService.deleteInactiveUsers(INACTIVITY_IN_MINUTES)
    
    if (deletedUsersEmails.length === 0) {
      return res.sendSuccess({
        message: `No account has been deleted as none of them exceeded the ${INACTIVITY_IN_MINUTES} minute/s inactivity limit.`
      })
    }

    const mailResponse = await ms.sendEmail(ms.templates.DELETED_ACCOUNT, { recipients: deletedUsersEmails })
    return res.sendSuccess({ data: mailResponse })
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
      if (user.role === AUTH.ROLES.ADMIN) {
        return res.sendForbidden({ message: 'Administrators cannot change roles' })
      }
      if (user.role === AUTH.ROLES.PREMIUM) {
        await usersService.updateUserRole(uid, AUTH.ROLES.USER)
        return res.sendSuccess({ message: 'Role Updated' })
      }
      const hasDocuments = userUtils(user).hasValidDocuments
      if (!hasDocuments)
        return res.sendForbidden({
          message: 'The user must upload the required documents to perform a role upgrade.'
        })
      await usersService.updateUserRole(uid, AUTH.ROLES.PREMIUM)
      res.sendSuccess({ message: 'Role Updated' })
    } catch (error) {
      if (error?.name === 'CastError') {
        return res.sendBadRequest({ message: 'Invalid User ID' })
      }

      return res.sendInternalServerError({ message: error })
    }
  }
}
