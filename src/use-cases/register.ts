import { UsersRepository } from '@/types/repositories-types/user-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

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
            throw new EmailAlreadyExistsError()
        }


        await this.usersRepository.create({email, name, passwordHash})
    }
}
