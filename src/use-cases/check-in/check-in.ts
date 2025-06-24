import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository.js'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}
interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}
    async createNewCheckIn({
        userId,
        gymId,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.createNewCheckIn({
            gymId,
            userId,
        })

        return { checkIn }
    }
}
