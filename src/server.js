import express from 'express';
import { logger } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Rutas API
import rolesRoutes from './routes/roles.js';
import usersRoutes from './routes/users.js';
import fleetsRoutes from './routes/fleets.js';
import vehiclesRoutes from './routes/vehicles.js';
import sectorsRoutes from './routes/sectors.js';
import areasRoutes from './routes/areas.js';
import shiftsRoutes from './routes/shifts.js';
import shiftAssignmentsRoutes from './routes/shiftAssignments.js';
import weighingsRoutes from './routes/weighings.js';
import shiftCutsRoutes from './routes/shiftCuts.js';
import applicationsRoutes from './routes/applications.js';
import puestosRoutes from './routes/puestos.js';

const app = express();

// 1. Obtenemos la ruta absoluta del directorio actual (src)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

// 2. Carpeta public deshabilitada (frontend separado)
// const publicPath = join(__dirname, 'public');
// app.use(express.static(publicPath));

// Servir archivos subidos (PDFs) estáticamente
const uploadsPath = join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Ruta raíz deshabilitada (frontend y backend independientes)
// app.get('/', (req, res) => {
//     res.sendFile(join(publicPath, 'index.html'));
// });

app.use(logger);

// Rutas API
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/fleets', fleetsRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/sectors', sectorsRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/shifts', shiftsRoutes);
app.use('/api/shift-assignments', shiftAssignmentsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/weighings', weighingsRoutes);
app.use('/api/shift-cuts', shiftCutsRoutes);
app.use('/api/puestos', puestosRoutes);

app.use(errorHandler);

export default app;