


import express from 'express';
import {
  getAllShiftAssignments,
  getShiftAssignmentById,
  createShiftAssignment,
  updateShiftAssignment,
  deleteShiftAssignment
} from '../controllers/shiftAssignmentsController.js';

const router = express.Router();


router.get('/', getAllShiftAssignments);


router.get('/:id', getShiftAssignmentById);


router.post('/', createShiftAssignment);


router.put('/:id', updateShiftAssignment);


router.delete('/:id', deleteShiftAssignment);

export default router;