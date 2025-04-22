import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { AppError } from '@/utils/AppError.js'
import { emailInUse } from '@/utils/db-queries-errors.js'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface IRegisterUser {
    name: string
    email: string
    password: string
}

export interface IRegisterUserResponse {
    user: User
}

export class UserRegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async createNewUser({
        email,
        name,
        password,
    }: IRegisterUser): Promise<IRegisterUserResponse> {
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
