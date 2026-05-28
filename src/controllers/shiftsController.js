import { prisma } from '../config/database.js'

export const getAllShifts = async (req, res) => {
  try {
    const shifts = await prisma.shift.findMany({
      orderBy: { id: 'asc' },
      include: { shiftAssignments: true }
    })
    res.json({ ok: true, data: shifts })
  } catch (error) {
    console.error('Error getting shifts:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getShiftById = async (req, res) => {
  try {
    const { id } = req.params
    const shift = await prisma.shift.findUnique({
      where: { id: parseInt(id) },
      include: { shiftAssignments: true }
    })
    if (!shift) {
      return res.status(404).json({ ok: false, error: 'Shift not found' })
    }
    res.json({ ok: true, data: shift })
  } catch (error) {
    console.error('Error getting shift:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createShift = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body
    if (!name || !startTime || !endTime) {
      return res.status(400).json({ ok: false, error: 'Name, startTime, and endTime are required' })
    }
    const shift = await prisma.shift.create({
      data: { name, startTime: new Date(startTime), endTime: new Date(endTime) },
      include: { shiftAssignments: true }
    })
    res.status(201).json({ ok: true, data: shift })
  } catch (error) {
    console.error('Error creating shift:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Shift already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateShift = async (req, res) => {
  try {
    const { id } = req.params
    const { name, startTime, endTime } = req.body
    if (!name || !startTime || !endTime) {
      return res.status(400).json({ ok: false, error: 'Name, startTime, and endTime are required' })
    }
    const shift = await prisma.shift.update({
      where: { id: parseInt(id) },
      data: { name, startTime: new Date(startTime), endTime: new Date(endTime) },
      include: { shiftAssignments: true }
    })
    res.json({ ok: true, data: shift })
  } catch (error) {
    console.error('Error updating shift:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Shift already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteShift = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.shift.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Shift deleted' })
  } catch (error) {
    console.error('Error deleting shift:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Shift not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}