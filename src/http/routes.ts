import { FastifyInstance } from 'fastify'
import { registerController } from './controller/register-controller.js'
import { authenticateController } from './controller/authenticate-controller.js'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)
}
