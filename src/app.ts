import fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes.js'
import { AppError } from './utils/app-error.js'
import { env } from './env/index.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        const formattedIssues = error.errors.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
            code: issue.code,
        }))

        return reply.status(400).send({
            message: 'validation error:',
            issues: formattedIssues,
        })
    }

    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // todo here we should log to an external tool like Datalog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: `internal server error` })
})
