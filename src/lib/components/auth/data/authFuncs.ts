
import * as schemas from "$lib/utils/schemas"
import {error} from '@sveltejs/kit'

import {PUBLIC_DOMAIN} from '$env/static/public'


export const signup = async (supabase, formData ) => {   
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string
    const captchaToken = req["h-captcha-response"] as string


    if(!schemas.signUpSchema.safeParse({email, password, captchaToken}).success){
        throw error(400, "password has to be min 6 characters ")
    }

    const { data, error: err } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {captchaToken}
    })


    if (err) {
        throw error(400, err)
    }

    return {
        error: false,
        message: "Authentification success"
    }

}




export const login = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string
    const captchaToken = req["h-captcha-response"] as string


    if(!schemas.signInSchema.safeParse({email, password, captchaToken}).success){
        throw error(400, "invalid credentials")
    }

    const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        options: {captchaToken}
    })

    if (err) {
        throw error(400, err)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}



export const verifyToken = async (supabaseAuthClient, formData ) => {
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const token = req.token as string

    if(!schemas.tokenVerifySchema.safeParse({email, token}).success){
        throw error(400, "invalid credentials")

    }

    const { data, error: err } = await supabaseAuthClient.auth.verifyOtp({
        email: email,
        token: token,
        type:"email",
    })


    
    if (err) {
        throw error(400, err)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}






export const resetPasswordRequest = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const captchaToken = req["h-captcha-response"] as string

    if(!schemas.resetPasswordReqSchema.safeParse({email, captchaToken}).success){
        throw error(400, "invalid credentials")

    }

    const { data, error: err } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${PUBLIC_DOMAIN}reset-password/update-password`,
            captchaToken: captchaToken
        }
    )

    if (err) {
        throw error(400, err)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}

