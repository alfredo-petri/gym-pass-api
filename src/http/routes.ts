import { FastifyInstance } from 'fastify'
import { userRegister } from './controller/register.js'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', userRegister)
}
