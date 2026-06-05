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

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const puesto = await prisma.puesto.findUnique({
      where: { id }
    });

    if (!puesto) {
      return res.status(404).json({ error: 'Vacante no encontrada' });
    }

    res.json(puesto);
  } catch (error) {
    console.error('Error fetching puesto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;