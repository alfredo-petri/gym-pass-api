import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '../authenticate/authenticate.js'

export const makeAuthenticateUseCase = (): AuthenticateUseCase => {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}
