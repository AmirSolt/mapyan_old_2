





export const fetchSystemData = async (selectedProducts) => {
    console.log("fetchSystemData")
    let sysData = null

    sysData = "sysData"

    if(!sysData)
        console.log("sysData not found")

    return sysData
}




export const fetchAccountCredit = async (supabaseService, user) => {
    const {data, error:err} = await supabaseService.from('account').select('id, credit').eq('id', user.id).single()

    if(err){
        console.log("fetchAccountCredit error", err)
    }
    return data
}









export const updateCredit = async (supabaseService, user, finalCredit) => {
    const {data, error:err} = await supabaseService.from('account').update({credit:finalCredit}).eq('id', user.id)
    if(err){
        console.log("updateCredit error", err)
    }
}

export  const insertCompare = async (supabaseService, user, account_id, response, asins) => {


    const {data, error:err} = await supabaseService
        .from('compare_instance')
        .insert({account_id:account_id, body:response, asins:asins })


    if(err){
        console.log("insertCompare error", err)
    }
}








