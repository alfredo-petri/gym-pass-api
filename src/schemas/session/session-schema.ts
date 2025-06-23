import { z } from 'zod'
import { emailSchema } from '../specific-types-schemas/email-schema.js'
import { passwordSchema } from '../specific-types-schemas/password-schema.js'

const sessionSchema = z.object({
    email: emailSchema(),
    password: passwordSchema(),
})

export { sessionSchema }
