import { prisma } from '../config/database.js'

export const getAllSectors = async (req, res) => {
  try {
    const sectors = await prisma.sector.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ ok: true, data: sectors })
  } catch (error) {
    console.error('Error getting sectors:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getSectorById = async (req, res) => {
  try {
    const { id } = req.params
    const sector = await prisma.sector.findUnique({
      where: { id: parseInt(id) }
    })
    if (!sector) {
      return res.status(404).json({ ok: false, error: 'Sector not found' })
    }
    res.json({ ok: true, data: sector })
  } catch (error) {
    console.error('Error getting sector:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createSector = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const sector = await prisma.sector.create({
      data: { name }
    })
    res.status(201).json({ ok: true, data: sector })
  } catch (error) {
    console.error('Error creating sector:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Sector already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateSector = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const sector = await prisma.sector.update({
      where: { id: parseInt(id) },
      data: { name }
    })
    res.json({ ok: true, data: sector })
  } catch (error) {
    console.error('Error updating sector:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Sector not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Sector already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteSector = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.sector.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Sector deleted' })
  } catch (error) {
    console.error('Error deleting sector:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Sector not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}