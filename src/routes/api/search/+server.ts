import {getSearchResultsAPI} from '$lib/server/amazonAPI/funcs'
import {json} from '@sveltejs/kit'

export const POST = async ({request}) => {
    let {searchTerm, domain} = await request.json()
    
    const products = await getSearchResultsAPI(searchTerm, domain)

    return json({products})
};