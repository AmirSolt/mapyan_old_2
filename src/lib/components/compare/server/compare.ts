
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import {supabaseService} from '$lib/server/apps/supabase'
import {getProductInformation, countryToDomain} from '$lib/components/products/server/amazonApiFuncs'

import { CompareCreditCost } from '$lib/utils/config'

export const compare = async (session, selectedProducts, country) => {

    const domain = countryToDomain(country)

    const asins = selectedProducts.map((product) => {
        return product.asin
    })

    let user = validate.userCheck(session);

    let account = await apiFuncs.fetchAccountCredit(supabaseService, user)
    validate.creditCheck(account.credit);

   
    let cleanProducts = await Promise.all(asins.map( asin => getCleanProductByAsin(asin, domain) ))


    let finalResponse = await chatGPT.getResponse(cleanProducts);
    if(!("content" in finalResponse)){
        throw new Error("No content in finalResponse")
    }
    const response = finalResponse.content


    let finalCredit = account.credit - CompareCreditCost;

    await updateDatabase(supabaseService, user, finalCredit, account.id, response)



    
    return {
        response,
        finalCredit
    }
}




export const getCleanProductByAsin = async (asin, domain) => {


    let product = await getProductInformation(asin, domain)
    let cleanProduct = await validate.cleanProduct(product)
    chatGPT.getOpenAIModeration(JSON.stringify(cleanProduct))


    return cleanProduct
}


export const updateDatabase = async (supabaseService, user, finalCredit, account_id, response) => {

    await Promise.all([apiFuncs.updateCredit(supabaseService, user, finalCredit), apiFuncs.insertCompare(supabaseService, user, account_id, response)]);

}