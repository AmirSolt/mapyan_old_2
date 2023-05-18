
import * as validate from './validate'
import * as apiFuncs from './apiFuncs'
import {getResponse} from './chatGPT'


export const compare = (session, selectedProducts) => {

    validate.userCheck(session);
    validate.creditUpdateCheck();

    apiFuncs.fetchSystemData(selectedProducts);

    validate.tokenCountCheck(message);


    getResponse(message);

    apiFuncs.updateAccount();


    // remaining credits, response
}