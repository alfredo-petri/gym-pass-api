import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticateController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const data = authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await authenticateUseCase.authenticateLogin(data)

    return reply.status(200).send()
}
