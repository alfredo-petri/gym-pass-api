import { expect, describe, it } from 'vitest'
import { UserRegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'

describe('register user use case', () => {
    it('should hash user password upon user registration', async () => {
        const registerUseCase = new UserRegisterUseCase({
            create: async (data) => {
                return {
                    id: '1',
                    name: data.name,
                    email: data.email,
                    passwordHash: data.passwordHash,
                    createdAt: new Date(),
                }
            },
            findByEmail: async (_email) => {
                return null
            },
        })

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
