import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { AppError } from '@/utils/AppError.js'
import { emailInUse } from '@/utils/db-queries-errors.js'
import { hash } from 'bcryptjs'

interface IRegisterUser {
    name: string
    email: string
    password: string
}

export class UserRegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async createNewUser({ email, name, password }: IRegisterUser) {
        const passwordHash = await hash(password, 6)

        const emailExists = await this.usersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError(emailInUse, 409)
        }

        await this.usersRepository.create({ email, name, passwordHash })
    }
}
