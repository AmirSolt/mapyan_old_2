
import * as schemas from "$lib/utils/schemas"



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
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email,
        options: {
            redirectTo: 'https://example.com/update-password',
        }
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

export const updatePassword = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string

    if(!signInSchema.safeParse({email, password}).success){
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
