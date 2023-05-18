import {z} from 'zod'

// export const signUpSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// })
// export const signInSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// })
// export const updatePasswordSchema = z.object({
//     new_password: z.string().min(6),
// })
export const otpSchema = z.object({
    email: z.string().email(),
    hCaptchaToken: z.string().min(6),
})
export const tokenVerifySchema = z.object({
    email: z.string().email(),
    token: z.string().min(6),
})




export const searchSchema = z.object({
    // no special characters allowed like !@#$%^&*()_+ etc
    country: z.string().regex(/^[a-zA-Z]{2}$/),
    keyword: z.string().min(1).max(255),
})