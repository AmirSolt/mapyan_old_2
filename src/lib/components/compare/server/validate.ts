

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


export const creditCheck = (credit) => {


    if(credit<1){
        return {
            status: 402,
            body: {
                error: "Not enough credits"
            }
        }
    }
    
}



export const tokenCountCheck = (message) => {



}


