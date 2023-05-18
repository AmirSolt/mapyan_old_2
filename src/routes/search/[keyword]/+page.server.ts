

export const load = async ({params, url }) => {

    const {keyword} = params;
    const country:string = url.searchParams.get('country')?? 'US';
    
 
    if(!searchSchema.safeParse({country, keyword}).success){
        return{
            keyword:keyword,
            status: 400,
            streamed: {products: []}
        }
    }



    return{
        keyword: keyword,
        streamed:{
            products: getSearchResults(keyword, country)
        }
    }

};