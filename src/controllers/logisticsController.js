import weighingService from '../services/weighingService.js'
import { createWeighingSchema } from '../models/weighingValidation.js'

class LogisticsController {
  async registerWeighing(req, res, next) {
    try {
      const validatedData = createWeighingSchema.parse(req.body)
      const weighing = await weighingService.create(validatedData)
      res.status(201).json(weighing)
    } catch (error) {
      next(error)
    }
  }

  async getPerformanceReport(req, res, next) {
    try {
      const { startDate, endDate } = req.query
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate and endDate are required' })
      }
      const report = await weighingService.getPerformanceReport(startDate, endDate)
      res.json(report)
    } catch (error) {
      next(error)
    }
  }
}

export default new LogisticsController()