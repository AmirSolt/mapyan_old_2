
import {searchSchema} from '$lib/utils/schemas';
import {getSearchResults} from '$lib/components/products/server/amazonApiFuncs'

export const load = async ({params, url }) => {

    const {keyword} = params;
    const country:string = url.searchParams.get('country')?? 'US';
    
 
    if(!searchSchema.safeParse({country, keyword}).success){
        return{
            searchTerm:keyword,
            status: 400,
            streamed: {products: []}
        }
    }



    return{
        searchTerm: keyword,
        streamed:{
            products: getSearchResults(keyword, country)
        }
    }

};