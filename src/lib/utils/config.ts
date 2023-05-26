export const FinalTokenCountLimit = 2000;
export const NumberOfCompareProducts = 3;
export const CompareCreditCost = 1;















export const ChatGPTTemprature = 0.5 // lower more coherence, higher more creativity




export const ChatGPTInstructions=`
Follow these instructions:
1. Use PRODUCTS to create a review comparison table.
2. User will tell you what features matter to them
3. Come up with 5 more features
4. Answer the features based on the reviews.
6. Don't use title, product name or price as a feature.
7. For every feature, Only give the best product: "DW"
8. For every feature, Only give the worst product: "DW"
9. If not sure answer with: "DQ"
10. ONLY use "DW" and "DL" once per row.
11. ONLY answer with "DW", "DQ" and "DL"
12. ONLY answer in csv.
13. Example response:
    asin,[feature_name],[feature_name],...
    [asin_value],[answer].[answer]....
`
// export const ChatGPTInstructions=`
// Use PRODUCTS to create a review comparison table.
// User will tell you what features matter to them, answer them based on the reviews.
// Come up with 5 more features and answer them accordingly.
// Don't use title, product name or price as a feature.
// For every feature ONLY give the best product between all: "DW"
// For every feature ONLY give the worst product between all: "DL"
// If not sure answer with: "DQ"
// ONLY use "DW" and "DL" once per row.
// ONLY answer with "DW", "DQ" and "DL"
// ONLY answer in csv.
// Example response:
// asin,[feature_name],[feature_name],...
// [asin_value],[answer].[answer]....
// `










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



