import { prisma } from '../config/database.js'

class PatientService {
  async create(data) {
    return await prisma.patient.create({ data })
  }

  async findById(id) {
    return await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      include: { consultations: { include: { diagnostics: true } } }
    })
  }

  async findAll() {
    return await prisma.patient.findMany({
      include: { consultations: { include: { diagnostics: true } } }
    })
  }

  async update(id, data) {
    const patient = await prisma.patient.findUnique({ where: { id: parseInt(id) } })
    if (!patient) throw new Error('Patient not found')
    return await prisma.patient.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    const patient = await prisma.patient.findUnique({ where: { id: parseInt(id) } })
    if (!patient) throw new Error('Patient not found')
    return await prisma.patient.delete({ where: { id: parseInt(id) } })
  }
}

export default new PatientService()