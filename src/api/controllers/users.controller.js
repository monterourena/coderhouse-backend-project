export class UsersController {
  getUsersBy = async (req, res) => {
    res.sendSuccess()
  }
  uploadDocument = async (req, res) => {
    console.log(req.files)
    res.sendSuccess({data: {file: req.files, body:req.body, params: req.params}})
  }
}
