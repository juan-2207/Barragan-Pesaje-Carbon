import { prisma } from '../config/database.js'

export const getAllShiftAssignments = async (req, res) => {
  try {
    const shiftAssignments = await prisma.shiftAssignment.findMany({
      orderBy: { id: 'asc' },
      include: { user: true, shift: true, shiftCuts: true }
    })
    res.json({ ok: true, data: shiftAssignments })
  } catch (error) {
    console.error('Error getting shift assignments:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getShiftAssignmentById = async (req, res) => {
  try {
    const { id } = req.params
    const shiftAssignment = await prisma.shiftAssignment.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, shift: true, shiftCuts: true }
    })
    if (!shiftAssignment) {
      return res.status(404).json({ ok: false, error: 'Shift assignment not found' })
    }
    res.json({ ok: true, data: shiftAssignment })
  } catch (error) {
    console.error('Error getting shift assignment:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createShiftAssignment = async (req, res) => {
  try {
    const { userId, shiftId, date } = req.body
    if (!userId || !shiftId || !date) {
      return res.status(400).json({ ok: false, error: 'userId, shiftId, and date are required' })
    }
    const shiftAssignment = await prisma.shiftAssignment.create({
      data: { userId: parseInt(userId), shiftId: parseInt(shiftId), date: new Date(date) },
      include: { user: true, shift: true, shiftCuts: true }
    })
    res.status(201).json({ ok: true, data: shiftAssignment })
  } catch (error) {
    console.error('Error creating shift assignment:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Shift assignment already exists' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'User or shift not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateShiftAssignment = async (req, res) => {
  try {
    const { id } = req.params
    const { userId, shiftId, date } = req.body
    if (!userId || !shiftId || !date) {
      return res.status(400).json({ ok: false, error: 'userId, shiftId, and date are required' })
    }
    const shiftAssignment = await prisma.shiftAssignment.update({
      where: { id: parseInt(id) },
      data: { userId: parseInt(userId), shiftId: parseInt(shiftId), date: new Date(date) },
      include: { user: true, shift: true, shiftCuts: true }
    })
    res.json({ ok: true, data: shiftAssignment })
  } catch (error) {
    console.error('Error updating shift assignment:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift assignment not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Shift assignment already exists' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'User or shift not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteShiftAssignment = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.shiftAssignment.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Shift assignment deleted' })
  } catch (error) {
    console.error('Error deleting shift assignment:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift assignment not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}