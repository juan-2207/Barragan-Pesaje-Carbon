import prisma from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

class AuthService {
  async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const role = await prisma.role.findUnique({ where: { name: data.role } })
    if (!role) throw new Error('Role not found')
    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        roleId: role.id
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: { select: { name: true } }
      }
    })
  }

  async login(email, password) {
    try {
      console.log('Login attempt for email:', email)
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true }
      })
      console.log('User found:', user ? 'yes' : 'no')

      if (!user) {
        console.log('User not found')
        throw new Error('Invalid credentials')
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      console.log('Password valid:', isPasswordValid)

      if (!isPasswordValid) {
        console.log('Invalid password')
        throw new Error('Invalid credentials')
      }

      const token = jwt.sign({ id: user.id, role: user.role?.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
      console.log('Token generated successfully')

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name
        },
        token
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async forgotPassword(email) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found')
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    })
    // In real app, send email
    return { message: 'Reset token generated', resetToken } // for testing
  }

  async resetPassword(token, newPassword) {
    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } }
    })
    if (!user) throw new Error('Invalid or expired token')
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    })
    return { message: 'Password reset successful' }
  }

  async getProfile(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: { select: { name: true } }
      }
    })
  }
}

export default new AuthService()