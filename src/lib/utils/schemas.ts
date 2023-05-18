import {z} from 'zod'

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
export const tokenVerifySchema = z.object({
    email: z.string().email(),
    token: z.string().min(6),
})
export const resetPasswordReqSchema = z.object({
    email: z.string().email(),
})
export const updatePasswordSchema = z.object({
    new_password: z.string().min(6),
})




export const searchSchema = z.object({
    country: z.string().regex(/^[a-zA-Z]{2}$/),
    keyword: z.string().min(1).max(255),
})