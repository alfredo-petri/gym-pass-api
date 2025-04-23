import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AppError } from '@/utils/app-error.js'

describe('register user use case', () => {
    it('should hash user password upon user registration', async () => {
        const usersRepository = new InMemoryUsersRepository()

        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.createNewUser({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Senha1234!',
        })

        const isPasswordCorrectlyHashed = await compare(
            'Senha1234!',
            user.passwordHash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe@email.com'

        await registerUseCase.createNewUser({
            name: 'John Doe',
            email,
            password: 'Senha1234!',
        })

        await expect(() =>
            registerUseCase.createNewUser({
                name: 'John Doe',
                email,
                password: 'Senha1234!',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
        const { user } = await registerUseCase.createNewUser({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Senha1234!',
        })
        expect(user.id).toEqual(expect.any(String))
    })
})
