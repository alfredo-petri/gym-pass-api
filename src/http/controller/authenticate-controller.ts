import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { sessionSchema } from '@/schemas/session/session-schema.js'
import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const data = sessionSchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await authenticateUseCase.authenticateLogin(data)

    return reply.status(200).send()
}
