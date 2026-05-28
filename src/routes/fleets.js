


import express from 'express';
import {
  getAllFleets,
  getFleetById,
  createFleet,
  updateFleet,
  deleteFleet
} from '../controllers/fleetsController.js';

const router = express.Router();


router.get('/', getAllFleets);


router.get('/:id', getFleetById);


router.post('/', createFleet);


router.put('/:id', updateFleet);


router.delete('/:id', deleteFleet);

export default router;