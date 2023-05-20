export const FinalTokenCountLimit = 2_000;
export const NumberOfCompareProducts = 3;
export const CompareCreditCost = 1;





export const ChatGPTInstructions = `
You are going to help a customer to buy a product by helping them compare their options.
You will be given a prompt with information about multiple products for you to compare.
Come up with 10 most important features that can help the customer to compare these products more effectively; Answer them in short form only.
You should respond only in json format.
Apply the same keys for all products.
 like this:
[
    {
        "ASIN": [ASIN]
        ...
        "[feature]": [Short Answer],
        ...
        "reviews_loved": [What features reviewers loved about this product?],
        "reviews_hated": [What features reviewers hate about this product?],
        "best_option": [true,false],
    },
]
`
export const ChatGPTTemprature = 0.2 // lower more coherence, higher more creativity