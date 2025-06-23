import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AppError } from '@/utils/app-error.js'
import { RegisterUseCase } from './register.js'

describe('register user use case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: RegisterUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should hash user password upon user registration', async () => {
        const { user } = await sut.createNewUser({
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
        const email = 'johndoe@email.com'

        await sut.createNewUser({
            name: 'John Doe',
            email,
            password: 'Senha1234!',
        })

        await expect(() =>
            sut.createNewUser({
                name: 'John Doe',
                email,
                password: 'Senha1234!',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to register', async () => {
        const { user } = await sut.createNewUser({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Senha1234!',
        })
        expect(user.id).toEqual(expect.any(String))
    })
})
