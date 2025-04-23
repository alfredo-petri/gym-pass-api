import { FastifyInstance } from 'fastify'
import { registerController } from './controller/register-controller.js'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
}
