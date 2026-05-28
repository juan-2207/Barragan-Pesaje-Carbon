


import prisma from '../config/database.js'


export const getAllFleets = async (req, res) => {
  try {
    const fleets = await prisma.fleet.findMany({
      orderBy: { id: 'asc' },
      include: { vehicles: true }
    });
    res.json({ ok: true, data: fleets });
  } catch (error) {
    console.error('Error getting fleets:', error);
    res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};


export const getFleetById = async (req, res) => {
  try {
    const { id } = req.params;
    const fleet = await prisma.fleet.findUnique({
      where: { id: parseInt(id) },
      include: { vehicles: true }
    });
    if (!fleet) {
      return res.status(404).json({ ok: false, error: 'Fleet not found' });
    }
    res.json({ ok: true, data: fleet });
  } catch (error) {
    console.error('Error getting fleet:', error);
    res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};


export const createFleet = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' });
    }
    const fleet = await prisma.fleet.create({
      data: { name },
      include: { vehicles: true }
    });
    res.status(201).json({ ok: true, data: fleet });
  } catch (error) {
    console.error('Error creating fleet:', error);
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Fleet already exists' });
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
  }
};


export const updateFleet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' });
    }
    const fleet = await prisma.fleet.update({
      where: { id: parseInt(id) },
      data: { name },
      include: { vehicles: true }
    });
    res.json({ ok: true, data: fleet });
  } catch (error) {
    console.error('Error updating fleet:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Fleet not found' });
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Fleet already exists' });
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
  }
};


export const deleteFleet = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.fleet.delete({
      where: { id: parseInt(id) }
    });
    res.json({ ok: true, message: 'Fleet deleted' });
  } catch (error) {
    console.error('Error deleting fleet:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Fleet not found' });
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
  }
};