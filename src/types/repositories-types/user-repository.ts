import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
    findUserByEmail(email: string): Promise<User | null>
    createNewUser(data: Prisma.UserCreateInput): Promise<User>
}
