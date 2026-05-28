
import prisma from '../config/database.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: {
          select: { id: true, name: true }
        }
      },
      orderBy: { id: 'asc' }
    })
    res.json({ ok: true, data: users })
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        status: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: { id: true, name: true }
        }
      }
    })
    if (!user) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' })
    }
    res.json({ ok: true, data: user })
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body
    if (!name || !email || !password || roleId === undefined) {
      return res.status(400).json({ ok: false, error: 'Los campos name, email, password y roleId son requeridos' })
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        roleId,
        status: 'active',
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        status: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: { select: { id: true, name: true } }
      }
    })
    res.status(201).json({ ok: true, data: user })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'El email ya está registrado' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, roleId, status, isActive } = req.body
    if (!name || !email || roleId === undefined) {
      return res.status(400).json({ ok: false, error: 'Los campos name, email y roleId son requeridos' })
    }
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        roleId,
        status: status || 'active',
        isActive: isActive !== undefined ? isActive : true
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        status: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: { select: { id: true, name: true } }
      }
    })
    res.json({ ok: true, data: user })
  } catch (error) {
    console.error('Error updating user:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Usuario no encontrado' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ ok: false, error: 'El email ya está registrado' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        status: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: { select: { id: true, name: true } }
      }
    })
    res.json({ ok: true, data: user })
  } catch (error) {
    console.error('Error deleting user:', error)
    if (error.code === 'P2025') {
      res.status(404).json({ ok: false, error: 'Usuario no encontrado' })
    } else {
      res.status(500).json({ ok: false, error: 'Error interno del servidor' })
    }
  }
}
