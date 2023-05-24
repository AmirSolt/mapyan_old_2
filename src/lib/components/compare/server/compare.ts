
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

    console.log("response:",finalResponse.content)

    const response = JSON.parse(finalResponse.content)
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


    // let product = await getProductInformation(asin, domain)
    let productInfo = await getReviews(asin, domain)
    let cleanProduct = await validate.cleanProductInfo(productInfo)
    await chatGPT.getOpenAIModeration(JSON.stringify(cleanProduct))


    return cleanProduct
}


export const updateDatabase = async (supabaseService, user, finalCredit, account_id, tableData) => {

    await Promise.all([apiFuncs.updateCredit(supabaseService, user, finalCredit), apiFuncs.insertCompare(supabaseService, user, account_id, tableData)]);

}



function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    return result
  }