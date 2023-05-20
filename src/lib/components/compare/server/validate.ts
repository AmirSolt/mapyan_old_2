
import {FinalTokenCountLimit, NumberOfCompareProducts} from '$lib/utils/config'
import { getTokens } from './tokenizer'


export const userCheck = (session) => {



    if(!session.user)
        return {
            status: 401,
            body: {
                error: "Unauthorized"
            }            
        }
    
    return session.user
}


export const creditCheck = (credit) => {


    if(credit<1){
        return {
            status: 402,
            body: {
                error: "Not enough credits"
            }
        }
    }
    
}










export const cleanProduct = async (product) => {


    while(getTokens(JSON.stringify(product)) > FinalTokenCountLimit/NumberOfCompareProducts){
  
        removeBiggestTextFromReviews(product);
    }   

    return product
}


function removeBiggestTextFromReviews(product){
    let biggestIndex = 0;
    let biggestText = product.top_reviews[0];
    for(let i=1; i<product.top_reviews.length; i++){
        if(product.top_reviews[i].length > biggestText.length){
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

