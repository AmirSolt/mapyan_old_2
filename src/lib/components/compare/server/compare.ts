
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import * as chatGPT from './chatGPT'
import {supabaseService} from '$lib/server/apps/supabase'

export const compare = (session, selectedProducts) => {

    let user = validate.userCheck(session);
    let credit = validate.creditUpdateCheck(user, supabaseService);

    let sysMessage = apiFuncs.fetchSystemData(selectedProducts);
    validate.tokenCountCheck(sysMessage);


    let chatResponse = chatGPT.getResponse(sysMessage);
    let finalResponse = chatGPT.replaceProductNameWithLinks(chatResponse);
    


    let finalCredit = apiFuncs.updateCredit(user, credit);
    apiFuncs.insertCompare();


    return {
        finalResponse,
        finalCredit
    }
}