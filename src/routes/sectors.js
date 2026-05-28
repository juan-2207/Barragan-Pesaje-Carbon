


import express from 'express';
import {
  getAllSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
} from '../controllers/sectorsController.js';

const router = express.Router();


router.get('/', getAllSectors);


router.get('/:id', getSectorById);


router.post('/', createSector);


router.put('/:id', updateSector);


router.delete('/:id', deleteSector);

export default router;