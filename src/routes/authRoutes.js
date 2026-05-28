import express from 'express'
import authController from '../controllers/authController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)
router.get('/profile', auth, authController.getProfile)

export default router