


import prisma from '../config/database.js';


export const getAllWeighings = async (req, res) => {
  try {
    const weighings = await prisma.weighing.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ ok: true, data: weighings })
  } catch (error) {
    console.error('Error getting weighings:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}


export const getWeighingById = async (req, res) => {
  try {
    const { id } = req.params
    const weighing = await prisma.weighing.findUnique({
      where: { id: parseInt(id) }
    })
    if (!weighing) {
      return res.status(404).json({ ok: false, error: 'Weighing not found' })
    }
    res.json({ ok: true, data: weighing })
  } catch (error) {
    console.error('Error getting weighing:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}


export const createWeighing = async (req, res) => {
  try {
    const { truckId, gross, net, tare, date, maxCapacity } = req.body
    if (!truckId || maxCapacity === undefined) {
      return res.status(400).json({ ok: false, error: 'truckId and maxCapacity are required' })
    }
    const weighing = await prisma.weighing.create({
      data: {
        truckId,
        gross: gross ? parseFloat(gross) : null,
        net: net ? parseFloat(net) : null,
        tare: tare ? parseFloat(tare) : null,
        date: date ? new Date(date) : new Date(),
        maxCapacity: parseFloat(maxCapacity)
      }
    })
    res.status(201).json({ ok: true, data: weighing })
  } catch (error) {
    console.error('Error creating weighing:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Weighing already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}


export const updateWeighing = async (req, res) => {
  try {
    const { id } = req.params
    const { truckId, gross, net, tare, date, maxCapacity } = req.body
    if (!truckId || maxCapacity === undefined) {
      return res.status(400).json({ ok: false, error: 'truckId and maxCapacity are required' })
    }
    const weighing = await prisma.weighing.update({
      where: { id: parseInt(id) },
      data: {
        truckId,
        gross: gross ? parseFloat(gross) : null,
        net: net ? parseFloat(net) : null,
        tare: tare ? parseFloat(tare) : null,
        date: date ? new Date(date) : undefined,
        maxCapacity: parseFloat(maxCapacity)
      }
    })
    res.json({ ok: true, data: weighing })
  } catch (error) {
    console.error('Error updating weighing:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Weighing not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Weighing already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}


export const deleteWeighing = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.weighing.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Weighing deleted' })
  } catch (error) {
    console.error('Error deleting weighing:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Weighing not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}