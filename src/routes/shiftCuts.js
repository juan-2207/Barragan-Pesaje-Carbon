


import express from 'express';
import {
  getAllShiftCuts,
  getShiftCutById,
  createShiftCut,
  updateShiftCut,
  deleteShiftCut
} from '../controllers/shiftCutsController.js';

const router = express.Router();


router.get('/', getAllShiftCuts);


router.get('/:id', getShiftCutById);


router.post('/', createShiftCut);


router.put('/:id', updateShiftCut);


router.delete('/:id', deleteShiftCut);

export default router;