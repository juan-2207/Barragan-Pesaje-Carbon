import { prisma } from '../config/database.js'

export const getAllShiftCuts = async (req, res) => {
  try {
    const shiftCuts = await prisma.shiftCut.findMany({
      orderBy: { id: 'asc' },
      include: { shiftAssignment: true }
    })
    res.json({ ok: true, data: shiftCuts })
  } catch (error) {
    console.error('Error getting shift cuts:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getShiftCutById = async (req, res) => {
  try {
    const { id } = req.params
    const shiftCut = await prisma.shiftCut.findUnique({
      where: { id: parseInt(id) },
      include: { shiftAssignment: true }
    })
    if (!shiftCut) {
      return res.status(404).json({ ok: false, error: 'Shift cut not found' })
    }
    res.json({ ok: true, data: shiftCut })
  } catch (error) {
    console.error('Error getting shift cut:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createShiftCut = async (req, res) => {
  try {
    const { shiftAssignmentId, cutTime, reason } = req.body
    if (!shiftAssignmentId || !cutTime) {
      return res.status(400).json({ ok: false, error: 'shiftAssignmentId and cutTime are required' })
    }
    const shiftCut = await prisma.shiftCut.create({
      data: { shiftAssignmentId: parseInt(shiftAssignmentId), cutTime: new Date(cutTime), reason },
      include: { shiftAssignment: true }
    })
    res.status(201).json({ ok: true, data: shiftCut })
  } catch (error) {
    console.error('Error creating shift cut:', error)
    if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'Shift assignment not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateShiftCut = async (req, res) => {
  try {
    const { id } = req.params
    const { shiftAssignmentId, cutTime, reason } = req.body
    if (!shiftAssignmentId || !cutTime) {
      return res.status(400).json({ ok: false, error: 'shiftAssignmentId and cutTime are required' })
    }
    const shiftCut = await prisma.shiftCut.update({
      where: { id: parseInt(id) },
      data: { shiftAssignmentId: parseInt(shiftAssignmentId), cutTime: new Date(cutTime), reason },
      include: { shiftAssignment: true }
    })
    res.json({ ok: true, data: shiftCut })
  } catch (error) {
    console.error('Error updating shift cut:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift cut not found' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'Shift assignment not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteShiftCut = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.shiftCut.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Shift cut deleted' })
  } catch (error) {
    console.error('Error deleting shift cut:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift cut not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}