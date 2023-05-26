import {z} from 'zod'

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    captchaToken: z.string()
})
export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    captchaToken: z.string()
})
export const tokenVerifySchema = z.object({
    email: z.string().email(),
    token: z.string().min(6),
})
export const resetPasswordReqSchema = z.object({
    email: z.string().email(),
    captchaToken: z.string()
})





export const searchSchema = z.object({
    keyword: z.string().min(1).max(255),
})