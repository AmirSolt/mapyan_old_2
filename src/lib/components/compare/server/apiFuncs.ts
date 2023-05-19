





export  const insertCompare = async () => {
    console.log("insertCompare")
    let compare = null

    compare = "compare"

    if(!compare)
        throw new Error("Compare could not be created")

    return compare
}


export const fetchSystemData = (selectedProducts) => {
    console.log("fetchSystemData")
    let sysData = null

    sysData = "sysData"

    if(!sysData)
        throw new Error("sysData not found")

    return sysData
}





export const updateCredit = (supabaseService, user, credit) => {
    const finalCredit = credit-1
    const {data, error:err} = supabaseService.from('account').update({credit:finalCredit}).eq('id', user.id).single()
    
    if(err){
        throw new Error("Something went wrong")
    }

    return finalCredit
}










