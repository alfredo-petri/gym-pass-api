import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { AppError } from '@/utils/app-error.js'
import { emailInUse } from '@/utils/db-queries-errors.js'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface IRegister {
    name: string
    email: string
    password: string
}

export interface IRegisterResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async createNewUser({
        email,
        name,
        password,
    }: IRegister): Promise<IRegisterResponse> {
        const passwordHash = await hash(password, 6)

        const emailExists = await this.usersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError(emailInUse, 409)
        }

        const user = await this.usersRepository.create({
            email,
            name,
            passwordHash,
        })

        return { user }
    }
}
