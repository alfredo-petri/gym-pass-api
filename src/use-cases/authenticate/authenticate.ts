import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { AppError } from '@/utils/app-error.js'
import { credentialsError } from '@/utils/db-queries-errors.js'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}
interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async authenticateLogin({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findUserByEmail(email)
        if (!user) {
            throw new AppError(credentialsError, 401)
        }
        const doesPasswordMatches = await compare(password, user.passwordHash)
        if (!doesPasswordMatches) {
            throw new AppError(credentialsError, 401)
        }

        return { user }
    }
}
