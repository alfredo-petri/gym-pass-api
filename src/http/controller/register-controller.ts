// import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { registerSchema } from '@/schemas/register/register-schema.js'
import { RegisterUseCase } from '@/use-cases/register/register.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const data = registerSchema.parse(request.body)

    // try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.createNewUser(data)
    // } catch (error) {
    //     if (error instanceof EmailAlreadyExistsError) {
    //         reply.status(409).send(error)
    //     }
    //     throw error
    // reply.status(500).send() // todo improve this error message
    // }

    return reply.status(201).send()
}
