import {getReviewsAPI} from '$lib/server/amazonAPI/funcs'
import {json} from '@sveltejs/kit'

export const POST = async ({request}) => {
    let {asin, domain} = await request.json()
    
    const reviews = await getReviewsAPI(asin, domain)

    return json({reviews})
};