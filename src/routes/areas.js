


import express from 'express';
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea
} from '../controllers/areasController.js';

const router = express.Router();


router.get('/', getAllAreas);


router.get('/:id', getAreaById);


router.post('/', createArea);


router.put('/:id', updateArea);


router.delete('/:id', deleteArea);

export default router;