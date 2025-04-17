import { prisma } from '@/lib/prisma'
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

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({ data: { name, email, passwordHash: password } })

    return reply.status(201).send()
}
