import prisma from '../config/database.js'

class WeighingService {
  async create(data) {
    let { gross, net, tare, maxCapacity } = data

    if (gross === undefined) {
      gross = net + tare
    } else if (net === undefined) {
      net = gross - tare
    } else if (tare === undefined) {
      tare = gross - net
    }

    if (gross > maxCapacity) {
      throw new Error('Gross weight exceeds maximum capacity')
    }

    return await prisma.weighing.create({ data: { ...data, gross, net, tare } })
  }

  async getPerformanceReport(startDate, endDate) {
    const result = await prisma.weighing.aggregate({
      _sum: { net: true },
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    })
    return { totalNetWeight: result._sum.net || 0 }
  }
}

export default new WeighingService()