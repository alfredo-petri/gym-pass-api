import { z } from 'zod'
import { emailSchema } from '../specific-types-schemas/email-schema.js'
import { passwordSchema } from '../specific-types-schemas/password-schema.js'
import { stringSchema } from '../primitive-types-schemas/string-schema.js'

const registerSchema = z.object({
    name: stringSchema('name', 'string'),
    email: emailSchema(),
    password: passwordSchema(),
})

export { registerSchema }
