
import {searchSchema} from '$lib/utils/schemas';
import {getSearchResults} from '$lib/components/products/server/amazonApiFuncs'
import {error} from '@sveltejs/kit'
export const load = async ({params, url }) => {

    const {keyword} = params;
    const country:string = url.searchParams.get('country')?? 'US';
    
 
    if(!searchSchema.safeParse({country, keyword}).success){
        throw error(400, "search term is not valid")
    }



    return{
        searchTerm: keyword,
        streamed: {products: getSearchResults(keyword, country)}

    }

};