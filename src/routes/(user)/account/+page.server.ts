import {error} from '@sveltejs/kit'



export const load = async ({ locals: { supabaseAuthServer, getSession } } ) => {


    const session = await getSession()

    if (!session.user){
        throw error(400, "Not authorized!")
    }

    const { data:account, error: err } = await supabaseAuthServer.from('account').select('*, compare_instance(*)').eq('id', session.user.id).single()

    if (err){
        throw error(400, `Something went wrong! ${err}`)

    }

    return {
        account,
        compare_instances: account['compare_instance'],
    }

};