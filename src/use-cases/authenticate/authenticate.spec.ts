import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateUseCase } from './authenticate.js'

describe('authenticate use case', () => {
    const password = 'Senha1234!'
    const email = 'johndoe@email.com'

    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const ust = new AuthenticateUseCase(usersRepository)

        await usersRepository.createNewUser({
            name: 'John Doe',
            email,
            passwordHash: await hash(password, 6),
        })

        const { user } = await ust.authenticateLogin({
            email: 'johndoe@email.com',
            password,
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const ust = new AuthenticateUseCase(usersRepository)
        await expect(
            ust.authenticateLogin({
                email,
                password,
            }),
        ).rejects.toEqual(
            expect.objectContaining({
                message: 'invalid credentials',
                statusCode: 401,
            }),
        )
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const ust = new AuthenticateUseCase(usersRepository)

        await usersRepository.createNewUser({
            name: 'John Doe',
            email,
            passwordHash: await hash(password, 6),
        })

        await expect(
            ust.authenticateLogin({
                email: 'johndoe@email.com',
                password: 'wrong-password',
            }),
        ).rejects.toEqual(
            expect.objectContaining({
                message: 'invalid credentials',
                statusCode: 401,
            }),
        )
    })
})
