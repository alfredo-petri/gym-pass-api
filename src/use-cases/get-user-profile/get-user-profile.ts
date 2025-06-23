import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { AppError } from '@/utils/app-error.js'
import { notFound } from '@/utils/db-queries-errors.js'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
    userId: string
}
interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async getUserProfile({
        userId,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findUserById(userId)
        if (!user) {
            throw new AppError(notFound('user'), 401)
        }

        return { user }
    }
}
