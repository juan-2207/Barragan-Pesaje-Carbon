import { z } from 'zod'

const createWeighingSchema = z.object({
  truckId: z.string().min(1),
  gross: z.number().positive().optional(),
  net: z.number().positive().optional(),
  tare: z.number().positive().optional(),
  maxCapacity: z.number().positive()
}).refine((data) => {
  const provided = [data.gross, data.net, data.tare].filter(v => v !== undefined).length
  return provided === 2
}, { message: "Exactly two of gross, net, tare must be provided" })

export { createWeighingSchema }