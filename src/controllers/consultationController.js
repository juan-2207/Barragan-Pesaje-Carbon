import consultationService from '../services/consultationService.js'
import { createConsultationSchema, updateConsultationSchema } from '../models/consultationValidation.js'

class ConsultationController {
  async create(req, res, next) {
    try {
      const validatedData = createConsultationSchema.parse(req.body)
      const consultation = await consultationService.create(validatedData)
      res.status(201).json(consultation)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const consultation = await consultationService.findById(id)
      if (!consultation) return res.status(404).json({ message: 'Consultation not found' })
      res.json(consultation)
    } catch (error) {
      next(error)
    }
  }

  async getByPatient(req, res, next) {
    try {
      const { patientId } = req.params
      const consultations = await consultationService.findByPatientId(patientId)
      res.json(consultations)
    } catch (error) {
      next(error)
    }
  }

  async getByDateRange(req, res, next) {
    try {
      const { startDate, endDate } = req.query
      const consultations = await consultationService.findByDateRange(startDate, endDate)
      res.json(consultations)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const validatedData = updateConsultationSchema.parse(req.body)
      const consultation = await consultationService.update(id, validatedData)
      res.json(consultation)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await consultationService.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default new ConsultationController()