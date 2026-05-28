import { prisma } from '../config/database.js'

export const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      select: { id: true, name: true, createdAt: true, updatedAt: true }
    })
    res.json({ ok: true, data: roles })
  } catch (error) {
    console.error('Error getting roles:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) }
    })
    if (!role) {
      return res.status(404).json({ ok: false, error: 'Role not found' })
    }
    res.json({ ok: true, data: role })
  } catch (error) {
    console.error('Error getting role:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createRole = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const role = await prisma.role.create({
      data: { name }
    })
    res.status(201).json({ ok: true, data: role })
  } catch (error) {
    console.error('Error creating role:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Role already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Name is required' })
    }
    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name }
    })
    res.json({ ok: true, data: role })
  } catch (error) {
    console.error('Error updating role:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Role not found' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'Role already exists' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.role.delete({
      where: { id: parseInt(id) }
    })
    res.json({ ok: true, message: 'Role deleted' })
  } catch (error) {
    console.error('Error deleting role:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Role not found' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}