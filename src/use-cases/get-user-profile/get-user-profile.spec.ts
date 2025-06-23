import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { hash } from 'bcryptjs'

const password = 'Senha1234!'
const email = 'johndoe@email.com'

describe('get user profile use case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: GetUserProfileUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.createNewUser({
            name: 'John Doe',
            email,
            passwordHash: await hash(password, 6),
        })

        const { user } = await sut.getUserProfile({ userId: createdUser.id })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })
    it('should not be able to get user profile with wrong id', async () => {
        await usersRepository.createNewUser({
            name: 'John Doe',
            email,
            passwordHash: await hash(password, 6),
        })

        await expect(
            sut.getUserProfile({ userId: 'non-existing-id' }),
        ).rejects.toEqual(
            expect.objectContaining({
                message: 'user with the provided identifier not founded',
                statusCode: 401,
            }),
        )
    })
})
