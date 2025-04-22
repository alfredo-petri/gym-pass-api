import { expect, describe, it } from 'vitest'
import { UserRegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AppError } from '@/utils/AppError.js'

describe('register user use case', () => {
    it('should hash user password upon user registration', async () => {
        const usersRepository = new InMemoryUsersRepository()

        const registerUseCase = new UserRegisterUseCase(usersRepository)

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
        const registerUseCase = new UserRegisterUseCase(usersRepository)

        const email = 'johndoe@email.com'

        await registerUseCase.createNewUser({
            name: 'John Doe',
            email,
            password: 'Senha1234!',
        })

        expect(() =>
            registerUseCase.createNewUser({
                name: 'John Doe',
                email,
                password: 'Senha1234!',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new UserRegisterUseCase(usersRepository)
        const { user } = await registerUseCase.createNewUser({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Senha1234!',
        })
        expect(user.id).toEqual(expect.any(String))
    })
})
