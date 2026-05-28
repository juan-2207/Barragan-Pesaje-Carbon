import patientService from '../services/patientService.js'
import { createPatientSchema, updatePatientSchema } from '../models/patientValidation.js'

class PatientController {
  async create(req, res, next) {
    try {
      const validatedData = createPatientSchema.parse(req.body)
      const patient = await patientService.create(validatedData)
      res.status(201).json(patient)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const patient = await patientService.findById(id)
      if (!patient) return res.status(404).json({ message: 'Patient not found' })
      res.json(patient)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const patients = await patientService.findAll()
      res.json(patients)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const validatedData = updatePatientSchema.parse(req.body)
      const patient = await patientService.update(id, validatedData)
      res.json(patient)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await patientService.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default new PatientController()