import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
    createNewCheckIn(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
