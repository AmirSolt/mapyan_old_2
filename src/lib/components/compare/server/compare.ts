
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import * as table from './table'
import {supabaseService} from '$lib/server/apps/supabase'
import {getProductInformation, getReviews, countryToDomain} from '$lib/components/products/server/amazonApiFuncs'
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

    console.log(cleanProducts)

    console.time("GPT response")
    let finalResponse = await chatGPT.getResponse(cleanProducts);
    if(!("content" in finalResponse)){
        throw error(400, {message: 'Got no response from AI'})
    }

    // console.log("response:",finalResponse.content)

    const response = csvToJson(finalResponse.content)
    console.timeEnd("GPT response")

    // console.log("Response Keys:",Object.keys(response[0]))

    const tableData = table.convertToTableData(selectedProducts, response)


    let finalCredit = account.credit - CompareCreditCost;
    await updateDatabase(supabaseService, user, finalCredit, account.id, tableData)



    
    return {
        tableData,
        finalCredit
    }
}












export const getCleanProductByAsin = async (asin, domain) => {


    // let product = await getProductInformation(asin, domain)
    let productInfo = await getReviews(asin, domain)
    let cleanProduct = await validate.cleanProductInfo(productInfo)
    await chatGPT.getOpenAIModeration(JSON.stringify(cleanProduct))


    return cleanProduct
}


export const updateDatabase = async (supabaseService, user, finalCredit, account_id, tableData) => {
    try{
    await Promise.all([apiFuncs.updateCredit(supabaseService, user, finalCredit), apiFuncs.insertCompare(supabaseService, user, account_id, tableData)]);
    }catch(err){
        throw error(400, `Could not get product data: ${err}`)
    }

}



function csvToJson(csv){
    var lines=csv.split("\n");
    var result = {};
    var headers=lines[0].split(",");
    for(let i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(let j=1;j<headers.length;j++){
            let data = convertDataType(currentline[j])
            obj[headers[j]] = data;
        }
        result[currentline[0]] = obj
    }
    return result
}


function convertDataType(dataPoint){

    if(dataPoint=="true")
        return true
    if(dataPoint=="false")
        return false
    if(dataPoint.toLowerCase()=="unknown")
        return null
    if(dataPoint=="null")
        return null

    return dataPoint
}