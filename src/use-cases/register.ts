import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface IRegisterUser {
    name: string
    email: string
    password: string
}

export class UserRegisterUseCase {
    constructor(private usersRepository: any) {}

    async execute({ email, name, password }: IRegisterUser) {
        const passwordHash = await hash(password, 6)

        const emailExists = await prisma.user.findUnique({ where: { email } })

        if (emailExists) {
            throw new Error('email is already in use')
        }


        await this.usersRepository.create({ name, email, passwordHash })
    }
}
