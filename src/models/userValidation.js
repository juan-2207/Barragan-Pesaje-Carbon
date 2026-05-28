import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['Admin', 'Operador de Báscula', 'Gerente de Minas'])
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

const forgotPasswordSchema = z.object({
  email: z.string().email()
})

const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6)
})

export { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema }