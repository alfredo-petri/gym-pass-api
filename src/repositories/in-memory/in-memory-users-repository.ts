import { UsersRepository } from '@/types/repositories-types/user-repository.js'
import { User, Prisma } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async findUserByEmail(email: string) {
        const user = this.users.find((user) => user.email === email)
        if (user) return user
        return null
    }

    async createNewUser(data: Prisma.UserCreateInput) {
        const user = {
            id: '1',
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            createdAt: new Date(),
        }

        this.users.push(user)

        return this.users[0]
    }
}
