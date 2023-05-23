
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import * as table from './table'
import {supabaseService} from '$lib/server/apps/supabase'
import {getProductInformation, countryToDomain} from '$lib/components/products/server/amazonApiFuncs'
import {error} from '@sveltejs/kit'
import { CompareCreditCost } from '$lib/utils/config'


export const compare = async (session, selectedProducts, country) => {

    const domain = countryToDomain(country)

    const asins = selectedProducts.map((product) => {
        return product.asin
    })

    let user = validate.userCheck(session);

    let account = await apiFuncs.fetchAccountCredit(supabaseService, user)
    validate.creditCheck(account.credit);

    console.time("Product fetching")
    let cleanProducts = await Promise.all(asins.map( asin => getCleanProductByAsin(asin, domain) ))
    console.timeEnd("Product fetching")

    console.time("GPT response")
    let finalResponse = await chatGPT.getResponse(cleanProducts);
    if(!("content" in finalResponse)){
        throw error(400, {message: 'Got no response from AI'})
    }
    const response = await JSON.parse(finalResponse.content)
    console.timeEnd("GPT response")

    console.log("Response Keys:",Object.keys(response[0]))

    const tableData = table.convertToTableData(selectedProducts, response)


    let finalCredit = account.credit - CompareCreditCost;
    await updateDatabase(supabaseService, user, finalCredit, account.id, tableData)



    
    return {
        tableData,
        finalCredit
    }
}












export const getCleanProductByAsin = async (asin, domain) => {


    let product = await getProductInformation(asin, domain)
    let cleanProduct = await validate.cleanProduct(product)
    await chatGPT.getOpenAIModeration(JSON.stringify(cleanProduct))


    return cleanProduct
}


export const updateDatabase = async (supabaseService, user, finalCredit, account_id, tableData) => {

    await Promise.all([apiFuncs.updateCredit(supabaseService, user, finalCredit), apiFuncs.insertCompare(supabaseService, user, account_id, tableData)]);

}