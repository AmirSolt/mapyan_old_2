

export function convertToTableData(selectedProducts, aiResponse){

    let tableData = []

    selectedProducts.forEach(
        (sProduct) =>{


            let productResponse = findProductByAsin(aiResponse, sProduct.asin)

            tableData.push(
                {
                    "asin":sProduct.asin,
                    "image":sProduct.image,
                    "link":sProduct.link,
                    "rating":sProduct.rating,
                    "ratings_total":sProduct.ratings_total,
                    "price_raw": "price" in sProduct? `${sProduct.price.symbol}${sProduct.price.value}` : null,
                    "features": productResponse.features
                }
            ) 

        }   
    )

    return tableData;

}



function findProductByAsin(aiResponse:any[], asin: string) {
    return aiResponse.find((product) => product.asin === asin);
}
