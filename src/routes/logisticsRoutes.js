import express from 'express'
import logisticsController from '../controllers/logisticsController.js'

const router = express.Router()

// Endpoint for registering truck weighing (dispatch)
router.post('/weighing', logisticsController.registerWeighing)

// Endpoint for performance report
router.get('/report', logisticsController.getPerformanceReport)

export default router