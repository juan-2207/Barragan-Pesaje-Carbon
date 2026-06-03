import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import authRoutes from './src/routes/authRoutes.js'
import logisticsRoutes from './src/routes/logisticsRoutes.js'
import rolesRoutes from './src/routes/roles.js'
import usersRoutes from './src/routes/users.js'
import fleetsRoutes from './src/routes/fleets.js'
import vehiclesRoutes from './src/routes/vehicles.js'
import sectorsRoutes from './src/routes/sectors.js'
import areasRoutes from './src/routes/areas.js'
import shiftsRoutes from './src/routes/shifts.js'
import shiftAssignmentsRoutes from './src/routes/shiftAssignments.js'
import weighingsRoutes from './src/routes/weighings.js'
import shiftCutsRoutes from './src/routes/shiftCuts.js'
import errorHandler from './src/middlewares/errorHandler.js'
import { logger } from './src/middlewares/logger.js'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(logger)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/logistics', logisticsRoutes)
app.use('/api/roles', rolesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/fleets', fleetsRoutes)
app.use('/api/vehicles', vehiclesRoutes)
app.use('/api/sectors', sectorsRoutes)
app.use('/api/areas', areasRoutes)
app.use('/api/shifts', shiftsRoutes)
app.use('/api/shift-assignments', shiftAssignmentsRoutes)
app.use('/api/weighings', weighingsRoutes)
app.use('/api/shift-cuts', shiftCutsRoutes)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app