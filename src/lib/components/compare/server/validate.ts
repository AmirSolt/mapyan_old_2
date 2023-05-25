
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










export const cleanInputProducts = async (inputProducts) => {

    return Object.values(inputProducts).map((inputProduct)=>cleanProductReview(inputProduct))
}


function cleanProductReview(inputProduct) {

    let clean:any = {
        "asin": inputProduct.product.asin,
        "title": inputProduct.product.title,
    }

    let reviews = getReviewBodies(inputProduct.reviews)
    reviews = sortReviewsBySize(reviews)

    // clean["reviews"] = reviews.slice(0,5)
    clean["reviews"] = reviews

    console.log("Token count:", getTokens(JSON.stringify(clean)), "ASIN:", clean.asin)

    while(getTokens(JSON.stringify(clean)) > FinalTokenCountLimit/NumberOfCompareProducts){
        clean.reviews.pop()
    }
    console.log("After Shave Token count:", getTokens(JSON.stringify(clean)), "ASIN:", clean.asin)
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