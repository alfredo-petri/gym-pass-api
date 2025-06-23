import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUseCase } from '../register/register.js'

export const makeRegisterUseCase = (): RegisterUseCase => {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}
