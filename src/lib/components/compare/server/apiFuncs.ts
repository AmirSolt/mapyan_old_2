import {error} from '@sveltejs/kit'








export const fetchAccountCredit = async (supabaseService, user) => {
    const {data, error:err} = await supabaseService.from('account').select('id, credit').eq('id', user.id).single()

    if(err){
        throw error(400, {message: 'Couldnt fetch account'})
    }
    return data
}

export const updateCredit = async (supabaseService, user, finalCredit) => {
    const {data, error:err} = await supabaseService.from('account').update({credit:finalCredit}).eq('id', user.id)
    if(err){
        console.log("updateCredit error", err)
    }
}

export  const insertCompare = async (supabaseService, user, account_id, tableData) => {


    const {data, error:err} = await supabaseService
        .from('compare_instance')
        .insert({account_id:account_id, table_data:tableData })


    if(err){
        console.log("insertCompare error", err)
    }
}








