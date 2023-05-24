
import * as schemas from "$lib/utils/schemas"
import {error} from '@sveltejs/kit'

import {PUBLIC_DOMAIN} from '$env/static/public'


export const signup = async (supabase, formData ) => {   
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string

    if(!schemas.signUpSchema.safeParse({email, password}).success){
        throw error(400, "invalid credentials")
    }

    const { data, error: err } = await supabase.auth.signUp({
        email: email,
        password: password,
    })


    if (err) {
        throw error(400, `Autherization failed: ${err}`)
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

    if(!schemas.signInSchema.safeParse({email, password}).success){
        throw error(400, "invalid credentials")
    }

    const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (err) {
        throw error(400, `Autherization failed: ${err}`)

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
        throw error(400, `Autherization failed: ${err}`)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}






export const resetPasswordRequest = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const email = req.email as string

    if(!schemas.resetPasswordReqSchema.safeParse({email}).success){
        throw error(400, "invalid credentials")

    }

    const { data, error: err } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${PUBLIC_DOMAIN}reset-password/update-password`,
        }
    )

    if (err) {
        throw error(400, `Autherization failed: ${err}`)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}

export const updatePassword = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const new_password = req.new_password as string
    const confirm_new_password = req.new_password as string

    if(new_password !== confirm_new_password){
        throw error(400, "Passwords do not match")

    }

    if(!schemas.updatePasswordSchema.safeParse({new_password}).success){
        throw error(400, "invalid credentials")

    }

    const { data, error: err } = await supabase.auth.updateUser(
        {password: new_password}
    )

    if (err) {
        throw error(400, `Autherization failed: ${err}`)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}
