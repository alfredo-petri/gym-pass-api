import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../prisma/check-ins-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public checkIns: CheckIn[] = []

    async createNewCheckIn(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            createdAt: new Date(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            userId: data.userId,
            gymId: data.gymId,
        }

        this.checkIns.push(checkIn)

        return this.checkIns[0]
    }
}
