
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import {supabaseService} from '$lib/server/apps/supabase'
import {getProductsByAsins} from '$lib/components/products/server/amazonApiFuncs'

import { CompareCreditCost } from '$lib/utils/config'

export const compare = async (session, selectedProducts, country) => {

    const asins = selectedProducts.map((product) => {
        return product.asin
    })

    let user = validate.userCheck(session);
    let account = await apiFuncs.fetchAccountCredit(supabaseService, user)
    validate.creditCheck(account.credit);

    let productInfos = await getProductsByAsins(asins, country)
    validate.cleanProductInfos(productInfos);


    let finalResponse = await chatGPT.getResponse(productInfos);

    let finalCredit = account.credit - CompareCreditCost;
    await apiFuncs.updateCredit(supabaseService, user, finalCredit); //run async don't wait for response
    await apiFuncs.insertCompare(supabaseService, user, account.id, finalResponse, asins); //run async don't wait for response


    return {
        finalResponse,
        finalCredit
    }
}

