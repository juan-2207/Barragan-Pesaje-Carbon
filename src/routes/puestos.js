import { Router } from 'express';
import { prisma } from '../config/database.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const puestos = await prisma.puesto.findMany();
    res.json(puestos);
  } catch (error) {
    console.error('Error fetching puestos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;