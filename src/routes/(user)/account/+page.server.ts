export const load = async ({ locals: { supabaseAuthServer, getSession } } ) => {


    const session = await getSession()

    if (!session.user){
        return {
            status: 401,
            body: {
                error: "Unauthorized"
            }
        }
    }

    const { data:account, error: err } = await supabaseAuthServer.from('account').select('*, compare_instance(*)').eq('id', session.user.id).single()

    if (err){
        console.log(err)
        return {
            status: 500,
            body: {
                error: "Something went wrong"
            }
        }
    }

    return {
        account,
        compare_instances: account['compare_instance'],
    }

};