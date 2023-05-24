
import { FinalTokenCountLimit, NumberOfCompareProducts } from '$lib/utils/config'
import { getTokens } from './tokenizer'
import { error } from '@sveltejs/kit'

export const userCheck = (session) => {



    if (!session.user)
        throw error(400, { message: 'Not a user' })

    return session.user
}


export const creditCheck = (credit) => {


    if (credit < 1) {
        throw error(400, { message: 'Not enough credit' })
    }

}










export const cleanProductInfo = async (productInfo) => {

    return cleanProductReview(productInfo)
}





const skipSpecList = [
    "Customer Reviews",
    "Date First Available",
    "ASIN ",
    "Is Discontinued By Manufacturer",
]
function cleanProductSpecs(product) {

    // reviews api
    // global
    // helpful_votes or biggest text

    let cleanedProduct = {}

        console.log("Token count:", getTokens(JSON.stringify(product)), "ASIN:", product.asin)

    product.specifications.forEach((spec) => {

            if (spec.name in skipSpecList) {
                return;
            }
            cleanedProduct[spec.name] = spec.value
        }
    )

        console.log("Shaved Token count:", getTokens(JSON.stringify(product)), "ASIN:", product.asin)

    return cleanedProduct;
}





function cleanProductReview(product) {

    let clean:any = {
        "asin": product.asin,
        "title": product.title,
    }

    let reviews = getReviewBodies(product.reviews)
    reviews = sortReviewsBySize(reviews)

    clean["reviews"] = reviews.slice(0,3)

    while(getTokens(JSON.stringify(clean)) > FinalTokenCountLimit/NumberOfCompareProducts){
        clean.reviews.pop()
    }
 

    console.log("Token count:", getTokens(JSON.stringify(clean)), "ASIN:", product.asin)



    return clean
}


// function getMostHelpfulReviewIndex(product){

//     let mostHelpfulIndex = 0;
//     let mostHelpful = 0;

//     product.reviews.forEach( (review, i)=>{
//         if(mostHelpful < review.helpful_votes){
//             mostHelpfulIndex = i
//             mostHelpful = review.helpful_votes
//         }
//     });


//     return mostHelpfulIndex
// }


function getReviewBodies(reviewObjs:any[]){
    return reviewObjs.map(r=>r.body) 
}


function sortReviewsBySize(reviews:any[]){


    reviews.sort(function(a, b) {
        if(a.length > b.length) return -1
        if(a.length < b.length) return 1
        return 0
    });

    return reviews
}