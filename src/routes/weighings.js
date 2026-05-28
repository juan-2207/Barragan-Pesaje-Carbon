


import express from 'express';
import {
  getAllWeighings,
  getWeighingById,
  createWeighing,
  updateWeighing,
  deleteWeighing
} from '../controllers/weighingsController.js';

const router = express.Router();


router.get('/', getAllWeighings);


router.get('/:id', getWeighingById);


router.post('/', createWeighing);


router.put('/:id', updateWeighing);


router.delete('/:id', deleteWeighing);

export default router;