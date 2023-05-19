
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import {supabaseService} from '$lib/server/apps/supabase'

export const compare = async (session, selectedProducts) => {

    let user = validate.userCheck(session);
    let account = await apiFuncs.fetchAccountCredit(supabaseService, user)
    validate.creditCheck(account.credit);

    // let sysMessage = apiFuncs.fetchSystemData(selectedProducts);
    // validate.tokenCountCheck(sysMessage);


    // let chatResponse = chatGPT.getResponse(sysMessage);
    // let finalResponse = chatGPT.replaceProductNameWithLinks(chatResponse);
    let finalResponse = "finalResponse";

    let finalCredit = account.credit - 1;
    await apiFuncs.updateCredit(supabaseService, user, finalCredit);
    await apiFuncs.insertCompare(supabaseService, user, account.id, finalResponse, selectedProducts);


    return {
        finalResponse,
        finalCredit
    }
}