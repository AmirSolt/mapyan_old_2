import {compare} from '$lib/components/compare/server/compare'
import { json } from '@sveltejs/kit'



export const POST = async ({request, locals:{getSession}}) => {
    
    let {selectedProducts} = await request.json()
    let session = await getSession()


    let results = compare(session, selectedProducts)

    return json(results)
};