





export  const insertCompare = async (supabaseService, user, account_id, finalResponse, selectedProducts) => {


    const asins = selectedProducts.map((product) => {
        return product.asin
    })

    const {data, error:err} = supabaseService
        .from('compare_instance')
        .insert({account_id:account_id, body:finalResponse, asins:asins })
        .eq('id', user.id)
        .single()

    if(err){
        console.log("insertCompare error", err)
    }

}


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
        console.log("SfetchAccountCredit error", err)
    }
    return data
}

export const updateCredit = async (supabaseService, user, finalCredit) => {
    const {data, error:err} = await supabaseService.from('account').update({credit:finalCredit}).eq('id', user.id).single()
    
    if(err){
        console.log("updateCredit error", err)
    }
}










