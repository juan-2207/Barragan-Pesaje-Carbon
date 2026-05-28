import { z } from 'zod'

const createConsultationSchema = z.object({
  patientId: z.number().int().positive(),
  date: z.string().transform((str) => new Date(str)), // or z.coerce.date()
  symptoms: z.string().min(1),
  notes: z.string().optional()
})

const updateConsultationSchema = createConsultationSchema.partial()

export { createConsultationSchema, updateConsultationSchema }