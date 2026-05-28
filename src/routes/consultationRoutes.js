import express from 'express'
import consultationController from '../controllers/consultationController.js'

const router = express.Router()

router.post('/', consultationController.create)
router.get('/:id', consultationController.getById)
router.get('/patient/:patientId', consultationController.getByPatient)
router.get('/', consultationController.getByDateRange)
router.put('/:id', consultationController.update)
router.delete('/:id', consultationController.delete)

export default router