import { sessionSchema } from '@/schemas/session/session-schema.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const data = sessionSchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.authenticateLogin(data)

    return reply.status(200).send()
}
