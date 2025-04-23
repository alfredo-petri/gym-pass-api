import { prisma } from '@/lib/prisma.js'
import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
    async findUserByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } })

        return user
    }

    async createNewUser(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data })
        return user
    }
}
