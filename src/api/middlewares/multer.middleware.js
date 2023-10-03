import { __src } from '../../utils/directories.utils.js'
import * as fs from 'fs'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname || 'default'
    const uploadPath = path.join(__src, 'storage', folder)
    fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Mimetype not allowed'), false)
  }
}

const upload = multer({ storage, fileFilter }).any()

const middleware = (req, res, next) =>
  upload(req, res, function (err) {
    if (err) {
      if(err?.message === 'Mimetype not allowed') return res.sendBadRequest({message: 'Mimetype not allowed'})
      return res.sendInternalServerError({message: err})
    }
    else{next()}
  })

export default middleware
