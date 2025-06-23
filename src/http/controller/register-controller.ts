import { registerSchema } from '@/schemas/register/register-schema.js'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const data = registerSchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.createNewUser(data)

    return reply.status(201).send()
}
