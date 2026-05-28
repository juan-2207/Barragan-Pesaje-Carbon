import { prisma } from '../config/database.js'

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { id: 'asc' },
      include: { fleet: true }
    })
    res.json({ ok: true, data: vehicles })
  } catch (error) {
    console.error('Error getting vehicles:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(id) },
      include: { fleet: true }
    })
    if (!vehicle) {
      return res.status(404).json({ ok: false, error: 'Vehicle not found' })
    }
    res.json({ ok: true, data: vehicle })
  } catch (error) {
    console.error('Error getting vehicle:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createVehicle = async (req, res) => {
  try {
    const { name, fleetId } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const vehicle = await prisma.vehicle.create({
      data: { name, fleetId: fleetId ? parseInt(fleetId) : null },
      include: { fleet: true }
    })
    res.status(201).json({ ok: true, data: vehicle })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Vehicle already exists' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'Fleet not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params
    const { name, fleetId } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: { name, fleetId: fleetId ? parseInt(fleetId) : null },
      include: { fleet: true }
    })
    res.json({ ok: true, data: vehicle })
  } catch (error) {
    console.error('Error updating vehicle:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Vehicle not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Vehicle already exists' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ ok: false, error: 'Fleet not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.vehicle.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Vehicle deleted' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Vehicle not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}