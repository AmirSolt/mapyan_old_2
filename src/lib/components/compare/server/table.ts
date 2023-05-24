

export function convertToTableData(selectedProducts, aiResponse){

    let tableData = []

    selectedProducts.forEach(
        (sProduct) =>{



            tableData.push(
                {
                    "asin":sProduct.asin,
                    "image":sProduct.image,
                    "link":sProduct.link,
                    "rating":sProduct.rating,
                    "ratings_total":sProduct.ratings_total,
                    "price_raw": "price" in sProduct? `${sProduct.price.symbol}${sProduct.price.value}` : null,
                    "response": aiResponse[sProduct.asin]
                }
            ) 

        }   
    )

    return tableData;

}


