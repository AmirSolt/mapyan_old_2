




export const userCheck = (session) => {



    if(!session.user)
        return {
            status: 401,
            body: {
                error: "Unauthorized"
            }            
        }
    
    return session.user
}


export const creditCheck = (supabaseService, user) => {

    const {data, error:err} = supabaseService.from('account').select('credit').eq('id', user.id).single()

    // edge function call

    if(err)
        return {
            status: 500,
            body: {
                error: "Something went wrong"
            }
        }

    if(data.credit<1){
        return {
            status: 402,
            body: {
                error: "Not enough credits"
            }
        }
    }

    return data.credit
    
}



export const tokenCountCheck = (message) => {



}