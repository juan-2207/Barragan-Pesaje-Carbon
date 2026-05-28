import authService from '../services/authService.js'
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../models/userValidation.js'

class AuthController {
  async register(req, res, next) {
    try {
      const data = registerSchema.parse(req.body)
      const user = await authService.register(data)
      res.status(201).json({ user })
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body)
      const result = await authService.login(email, password)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = forgotPasswordSchema.parse(req.body)
      const result = await authService.forgotPassword(email)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = resetPasswordSchema.parse(req.body)
      const result = await authService.resetPassword(token, newPassword)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id
      const profile = await authService.getProfile(userId)
      res.json(profile)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()