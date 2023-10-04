import { DTOs } from "../dto/dtos.js"
import { Services } from "../services/services.js"

const usersService = Services.users
export class UsersController {
  getUsersBy = async (req, res) => {
    res.sendSuccess()
  }
  
  uploadDocuments = async (req, res) => {
    const uid = req.user.id
    const documents = req.files.map((file)=>{
      return DTOs.file(file).userDocument
    })

    const response = await usersService.uploadDocuments(uid,documents)

    console.log(response)
    res.sendSuccess({data: {file: req.files, body:req.body, params: req.params}})
  }
}
