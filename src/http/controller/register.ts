import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { UserRegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function userRegister(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
    })

    const data = registerBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository() 
        const userRegisterUseCase = new UserRegisterUseCase(usersRepository)
        await userRegisterUseCase.execute(data)
    } catch (error) {
        reply.status(409).send(error)
    }

    return reply.status(201).send()
}
