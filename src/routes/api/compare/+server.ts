import {compare} from '$lib/components/compare/server/compare'
import { json } from '@sveltejs/kit'



export const POST = async ({request, locals:{getSession}}) => {
    
    let {selectedProducts, userCountry} = await request.json()
    let session = await getSession()


    let results = await compare(session, selectedProducts, userCountry)

    return json(results)
};