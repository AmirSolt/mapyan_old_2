
import {searchSchema} from '$lib/utils/schemas';
import {error} from '@sveltejs/kit'
export const load = async ({params, url }) => {

    const {keyword} = params;
     
    if(!searchSchema.safeParse({keyword}).success){
        throw error(400, "search term is not valid")
    }

    return{
        searchTerm: keyword,
    }

};