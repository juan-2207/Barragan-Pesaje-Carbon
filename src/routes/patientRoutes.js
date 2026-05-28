import express from 'express'
import patientController from '../controllers/patientController.js'

const router = express.Router()

router.post('/', patientController.create)
router.get('/', patientController.getAll)
router.get('/:id', patientController.getById)
router.put('/:id', patientController.update)
router.delete('/:id', patientController.delete)

export default router