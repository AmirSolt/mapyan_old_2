
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import * as table from './table'
import {supabaseService} from '$lib/server/apps/supabase'
// import {getProductInformation, getReviews, countryToDomain} from '$lib/server/amazonAPI/funcs'
import {error} from '@sveltejs/kit'
import { CompareCreditCost } from '$lib/utils/config'


export const compare = async (session, selectedProducts, inputProducts, userInput) => {

    // ========================== Check creds ============================
    let user = validate.userCheck(session);
    
    let account = await apiFuncs.fetchAccountCredit(supabaseService, user)
    validate.creditCheck(account.credit);
    // =================================================================
    

    // ========================== Mount price on input product ============================
    console.time("iProduct price mount")
    selectedProducts.forEach((sProduct)=>{
        let price = null
        if("price" in sProduct){
            const p = sProduct.price;
            price = `${p.symbol} ${p.value} ${p.currency}`
        }
        Object.values(inputProducts).forEach((iProduct)=>{
            if(iProduct.asin == sProduct.asin)
                iProduct.product.price = price
        })
    })
    console.timeEnd("iProduct price mount")
    // =================================================================

    console.time("cleaning Products")
    let cleanInputProducts = await validate.cleanInputProducts(inputProducts)
    console.timeEnd("cleaning Products")


    console.time("GPT response")
    let finalResponse = await chatGPT.getResponse(cleanInputProducts, userInput);
    if(!("content" in finalResponse)){
        throw error(400, {message: 'Got no response from AI'})
    }
    const response = csvToJson(finalResponse.content)
    console.timeEnd("GPT response")

    console.log("CHATGPT:",response)

    const tableData = table.convertToTableData(selectedProducts, response)

    // ================= update db
    let finalCredit = account.credit - CompareCreditCost;
    await updateDatabase(supabaseService, user, finalCredit, account.id, tableData)



    
    return {
        tableData,
        finalCredit
    }
}










const updateDatabase = async (supabaseService, user, finalCredit, account_id, tableData) => {
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

    if(dataPoint === undefined)
        return null
    if(dataPoint=="true")
        return true
    if(dataPoint=="false")
        return false
    if(dataPoint=="t")
        return true
    if(dataPoint=="f")
        return false
    if(dataPoint.toLowerCase()=="unknown")
        return null
    if(dataPoint=="null")
        return null

    return dataPoint
}