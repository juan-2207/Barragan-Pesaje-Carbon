import { prisma } from '../config/database.js'

class ConsultationService {
  async create(data) {
    const patient = await prisma.patient.findUnique({ where: { id: data.patientId } })
    if (!patient) throw new Error('Patient not found')
    return await prisma.consultation.create({ data, include: { patient: true } })
  }

  async findById(id) {
    return await prisma.consultation.findUnique({
      where: { id: parseInt(id) },
      include: { patient: true, diagnostics: true }
    })
  }

  async findByPatientId(patientId) {
    return await prisma.consultation.findMany({
      where: { patientId: parseInt(patientId) },
      include: { diagnostics: true }
    })
  }

  async findByDateRange(startDate, endDate) {
    return await prisma.consultation.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: { patient: true, diagnostics: true }
    })
  }

  async update(id, data) {
    const consultation = await prisma.consultation.findUnique({ where: { id: parseInt(id) } })
    if (!consultation) throw new Error('Consultation not found')
    if (data.patientId) {
      const patient = await prisma.patient.findUnique({ where: { id: data.patientId } })
      if (!patient) throw new Error('Patient not found')
    }
    return await prisma.consultation.update({
      where: { id: parseInt(id) },
      data,
      include: { patient: true }
    })
  }

  async delete(id) {
    const consultation = await prisma.consultation.findUnique({ where: { id: parseInt(id) } })
    if (!consultation) throw new Error('Consultation not found')
    return await prisma.consultation.delete({ where: { id: parseInt(id) } })
  }
}

export default new ConsultationService()