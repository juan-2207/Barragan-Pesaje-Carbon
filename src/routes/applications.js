import { Router } from 'express';
import upload from '../config/multer.js';
import { createApplication } from '../controllers/applicationsController.js';

const router = Router();

// El middleware 'upload.single' intercepta el archivo PDF antes de llegar a tu controlador
router.post('/', upload.single('resume'), createApplication);

export default router;