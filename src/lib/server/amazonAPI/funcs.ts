
import {PRIVATE_AMAZON_SCRAPER_API_KEY} from '$env/static/private'
import {error} from '@sveltejs/kit'
const API_URL = 'https://api.asindataapi.com/request'




export async function getSearchResultsAPI(keyword, domain){
    let products:any[] = [];
    const url = addQueriesToURL(API_URL, getSearchQueries(keyword, domain));
    await fetch(url, {
        method: 'GET',
    }).then(
        (response) => response.json()
    ).then((data)=>{

        if(!("search_results" in data)){
            console.log(data)
            throw error(400, "No search_results key in data")
        }
        products = data["search_results"]

        // products.forEach((product)=>product.link=swapUrlWithAFfiliate(product.link))

    }).catch((err)=> {
        throw error(400, `There was an error in amazon search: ${err}`)
    })
    return products
}

export async function getProductInfoAPI(asin, domain){

    console.time(`fetching ASIN: ${asin}`)

    let product:any = {};

    // console.log("//////////////////////////////////////")
    // console.log(addQueriesToURL(API_URL, getProductQueries(asin, domain)))

    const url = addQueriesToURL(API_URL, getProductQueries(asin, domain));
    await fetch(url, {
        method: 'GET',
    }).then(
        (response) => response.json()
    ).then((data)=>{
        const tempProduct = data["product"]
        let reviews = [];
        let price = "";

        
        if("top_reviews" in tempProduct){
            reviews = tempProduct["top_reviews"].map((review)=> review["body"].replace("Read more", ""))
        }else{
            reviews = ["No reviews found"]
        }
   
        if("buybox_winner"in tempProduct && "price" in tempProduct["buybox_winner"]){
            const priceObj = tempProduct["buybox_winner"]["price"];
            price = `${priceObj["value"]} ${priceObj["currency"]}`
        }else{
            price = "No prices found"
        }

        product = {
            "asin": tempProduct["asin"],
            // "title": tempProduct["title"],
            // "price":price,
            // "brand": tempProduct["brand"],
            // "categories": tempProduct["categories_flat"],
            // "description": tempProduct["description"],
            // "feature_bullets": tempProduct["feature_bullets_flat"],
            "specifications": tempProduct["specifications"],
            // "specifications": tempProduct["specifications_flat"],
            // "rating": tempProduct["rating"],
            // "ratings_total": tempProduct["ratings_total"],
            // "top_reviews": reviews,
        }
        
    }).catch((err)=> {
        throw error(400, `There was an error in fetching products: ${err}`)
    })

    console.timeEnd(`fetching ASIN: ${asin}`)

    return product
}






export async function getReviewsAPI(asin, domain){
    let reviews:any = {};
    const url = addQueriesToURL(API_URL, getReviewQueries(asin, domain));
    await fetch(url, {
        method: 'GET',
    }).then(
        (response) => response.json()
    ).then((data)=>{
        
        if(!("reviews" in data)){
            throw error(400, "Could not fetch product reviews")
        }

        reviews = {
            "product": data.product,
            "reviews": data.reviews,
        }



    }).catch((err)=> {
        throw error(400, `There was an error in fetching reviews: ${err}`)
    })
    return reviews
}






















function addQueriesToURL(urlRaw, queries){
    let url = new URL(urlRaw)
    Object.keys(queries).forEach(key=>{
            url.searchParams.append(key, queries[key])
        }
    )

    return url.toString()
}


function getSearchQueries(keyword:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "search",
        amazon_domain: domain,
        search_term: keyword,
        exclude_sponsored: "true",
        output: "json",
        include_html: "false",
        associate_id: getAffiliateCode(domain),
        sort_by: "featured",
        page: "1"
    }
}

function getProductQueries(asin:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "product",
        amazon_domain: domain,
        asin: asin,
        associate_id: getAffiliateCode(domain),
        output: "json",
        include_html: "false"
    }
}

function getReviewQueries(asin:string, domain:string){
    return{
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "reviews",
        amazon_domain: domain,
        asin: asin,
        associate_id: getAffiliateCode(domain),
        review_stars: "all_stars",
        review_formats: "all_formats",
        reviewer_type: "all",
        global_reviews: "true",
        review_media_type: "all_reviews",
        sort_by: "most_helpful",
        page: "1",
        output: "json",
        include_html: "false"
    }
}


function getAffiliateCode(domain){

    switch(domain){
        case 'amazon.com':
            return 'mapyan-20'
        case 'amazon.ca':
            return 'mapyan09-20'
        default:
            return 'mapyan09-20'
    }
}


