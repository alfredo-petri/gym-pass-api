import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface IRegisterUser {
    name: string
    email: string
    password: string
}

export const userRegisterUseCase = async ({
    email,
    name,
    password,
}: IRegisterUser) => {
    const passwordHash = await hash(password, 6)

    const emailExists = await prisma.user.findUnique({ where: { email } })

    if (emailExists) {
        throw new Error('email is already in use')
    }

    await prisma.user.create({ data: { name, email, passwordHash } })
}
