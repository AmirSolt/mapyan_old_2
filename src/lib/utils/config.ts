export const FinalTokenCountLimit = 2_000;
export const NumberOfCompareProducts = 3;
export const CompareCreditCost = 1;





export const ChatGPTInstructions = `
You are going to help a customer to buy a product.
You will be given a prompt with information about multiple products for you to compare.
Come up with 5 most important features that are relatable to these products and help the customer to compare these products; Answer them in boolean only.
You should respond only in json format.
 like this:
[
    {
        ASIN: [ASIN]
        ...
        {x feature}: [true,false],
        ...
        reviews_loved: [What do reviews love about this product?],
        reviews_hated: [What do reviews hate about this product?],
        recomended_to_buy: [true,false],
    },
]
`
export const ChatGPTTemprature = 0.2 // lower more coherence, higher more creativity