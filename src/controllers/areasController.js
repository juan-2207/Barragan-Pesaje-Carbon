


import prisma from '../config/database.js'

export const getAllAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ ok: true, data: areas })
  } catch (error) {
    console.error('Error getting areas:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getAreaById = async (req, res) => {
  try {
    const { id } = req.params
    const area = await prisma.area.findUnique({
      where: { id: parseInt(id) }
    })
    if (!area) {
      return res.status(404).json({ ok: false, error: 'Area not found' })
    }
    res.json({ ok: true, data: area })
  } catch (error) {
    console.error('Error getting area:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createArea = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const area = await prisma.area.create({
      data: { name }
    })
    res.status(201).json({ ok: true, data: area })
  } catch (error) {
    console.error('Error creating area:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Area already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateArea = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const area = await prisma.area.update({
      where: { id: parseInt(id) },
      data: { name }
    })
    res.json({ ok: true, data: area })
  } catch (error) {
    console.error('Error updating area:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Area not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Area already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteArea = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.area.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Area deleted' })
  } catch (error) {
    console.error('Error deleting area:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Area not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}