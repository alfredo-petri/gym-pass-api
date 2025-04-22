import { expect, describe, it } from 'vitest'
import { UserRegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'

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
})
