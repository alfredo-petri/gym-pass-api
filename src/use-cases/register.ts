import { UsersRepository } from '@/types/repositories-types/user-repository'
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
            throw new Error('email is already in use')
        }


        await this.usersRepository.create({email, name, passwordHash})
    }
}
