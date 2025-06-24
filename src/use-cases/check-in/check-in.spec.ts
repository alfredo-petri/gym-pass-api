import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

describe('checkin use case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: CheckInUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.createNewCheckIn({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        console.log(checkIn.createdAt)

        expect(checkIn.id).toEqual(expect.any(String))
    })
})
