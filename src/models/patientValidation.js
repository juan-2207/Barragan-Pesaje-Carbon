import { z } from 'zod'

const createPatientSchema = z.object({
  name: z.string().min(1),
  birthdate: z.string().transform((str) => new Date(str)),
  gender: z.string().min(1),
  address: z.string().optional(),
  phone: z.string().optional()
})

const updatePatientSchema = createPatientSchema.partial()

export { createPatientSchema, updatePatientSchema }