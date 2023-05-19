
import * as schemas from "$lib/utils/schemas"

import {PUBLIC_DOMAIN} from '$env/static/public'


export const signup = async (supabase, formData ) => {   
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string

    if(!schemas.signUpSchema.safeParse({email, password}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.signUp({
        email: email,
        password: password,
    })


    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
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
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
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
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabaseAuthClient.auth.verifyOtp({
        email: email,
        token: token,
        type:"email",
    })


    
    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
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
        console.log("schema failed")
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${PUBLIC_DOMAIN}reset-password/update-password`,
        }
    )

    if (err) {
        console.log("resetPasswordRequest")
        console.log(err)
        console.log(data)
        return {
            error: true,
            message: "Authentification failed"
        }
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
        return {
            error: true,
            message: "Passwords do not match"
        }
    }

    if(!schemas.updatePasswordSchema.safeParse({new_password}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.updateUser(
        {password: new_password}
    )

    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
    }

    return {
        error: false,
        message: "Authentification success"
    }
}
