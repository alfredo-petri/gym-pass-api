import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { userRegister } from './controller/register'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', userRegister)
}
