
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










export const cleanProduct = async (product) => {

    return cleanProductSpecs(product)
}





const skipSpecList = [
    "Customer Reviews",
    "Date First Available",
    "ASIN ",
    "Is Discontinued By Manufacturer",
]
function cleanProductSpecs(product) {

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
    console.log("Token count:", getTokens(JSON.stringify(product)), "ASIN:", product.asin)


    while (getTokens(JSON.stringify(product)) > FinalTokenCountLimit / NumberOfCompareProducts) {

        removeBiggestTextFromReviews(product);
    }

    console.log("Shaved Token count:", getTokens(JSON.stringify(product)), "ASIN:", product.asin)




    return product
}

function removeBiggestTextFromReviews(product) {
    let biggestIndex = 0;
    let biggestText = product.top_reviews[0];
    for (let i = 1; i < product.top_reviews.length; i++) {
        if (product.top_reviews[i].length > biggestText.length) {
            biggestIndex = i;
            biggestText = product.top_reviews[i];
        }
    }

    product.top_reviews.splice(biggestIndex, 1);
}




// const cleanProductInfos = (productInfos) => {

//     let popIndex = 0;

//     while(getTokens(JSON.stringify(productInfos)) > FinalTokenCountLimit){
//         if(popIndex >= productInfos.length)
//             popIndex = 0;

//         removeBiggestTextFromReviews(productInfos, popIndex);

//         popIndex++;
//     }
// }

