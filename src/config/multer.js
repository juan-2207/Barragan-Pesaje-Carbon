// src/config/multer.js
import path from 'path'
import fs from 'fs'
import multer from 'multer'

const uploadDir = path.resolve('uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, safeName)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedExt = path.extname(file.originalname).toLowerCase()
  if (file.mimetype === 'application/pdf' || allowedExt === '.pdf') {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten archivos PDF'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

export default upload