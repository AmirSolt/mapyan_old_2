export const FinalTokenCountLimit = 1500;
export const NumberOfCompareProducts = 3;
export const CompareCreditCost = 1;















export const ChatGPTTemprature = 0.3 // lower more coherence, higher more creativity




export const ChatGPTInstructions=`
You are going to make a comparison table for a customer.
You will be given information about products.
This table should have atleast 20 features.
Features must help customers compare these products.
Don't use title, brand, asin or review as a feature.
Use information given to you in title and reviews to come up features.
If you can't find a feature in a review, use null.
If answer is boolean use true or false.
If answer is qualifying use either "bad" or "ok" or "good".
If answer is "unkown" use null.
All products must have the same features.
Use this template:
{
   "[asin]":{
        "[header_name]": [answer],
         "[header_name]": [answer],
         "[header_name]": [answer],
        ....
   },
...
}
`










// ========================== Reviews comapre
// export const ChatGPTInstructions=`
// You will be given reviews on a few products.
// Your purpose is to help customers purchase the best product by comparing reviews for each product.
// Come up 20 topics and features that are mentioned in the reviews and are relevant to these products and answer them.
// Answer each topic with a number between 1-4, where 1 is bad and 4 is excellent. Answer 0 if it's not relevant or unknown.
// Always have the same topics for all products. 
// You can only respond in correct json. This is a template for you to follow:
// [
//     {
//         "asin": [asin],
//         "features": {
//             ...
//         }
//     },
//     ...
// ]
// `



// ========================== Specification comapre
// export const ChatGPTInstructions=`
// You will be given information about multiple products.
// Your purpose is to help customers purchase the best product.
// Come up with 10 features that are relevant to these products and answer for each product.
// You should answer in boolean or number. If you must answer in string don't exceed 3 words.
// You can only respond in correct json. This is a template for you to follow:
// [
//     {
//         "asin": [asin],
//         "features": {
//             ...
//         }
//     },
//     ...
// ]
// `
/*
To Change specs to review:
1. change cleaning product function
2. change information sent by amazon api
4. change instructions 
5. change table row smily faces 

*/



