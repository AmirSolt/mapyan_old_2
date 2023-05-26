import { error, json } from "@sveltejs/kit"

export const POST = async ({ request,  locals:{supabaseAuthServer, getSession} }) => {
    let {newPassowrd, confirmNewPassowrd} = await request.json()
    let session = await getSession()
    let user = session.user;

    if(!user)
        throw error(400, "Unauthorized request.")

	await updatePassword(user, supabaseAuthServer, newPassowrd, confirmNewPassowrd)

    return json({success:true})
}

const updatePassword = async(user, supabase, newPassowrd, confirmNewPassowrd ) => {    

    if(newPassowrd !== confirmNewPassowrd){
        throw error(400, "Passwords do not match")
    }

    const { data, error: err } = await supabase.auth.admin.updateUserById(
        user.id,
        {password: newPassowrd}
    )

    if (err) {
        throw error(400, `Autherization failed: ${err}`)

    }

    return {
        error: false,
        message: "Authentification success"
    }
}
