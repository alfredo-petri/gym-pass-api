import {
    invalidEmailErrorMessage,
    invalidTypeErrorMessage,
    requiredErrorMessage,
} from '@/utils/validation-errors.js'
import { z } from 'zod'

export const emailSchema = () => {
    return z
        .string({
            required_error: requiredErrorMessage('email'),
            invalid_type_error: invalidTypeErrorMessage('email', 'string'),
        })
        .email({ message: invalidEmailErrorMessage })
}
