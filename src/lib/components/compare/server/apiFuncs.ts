





export const updateAccount = (account) => {
    console.log("updateAccount")
  
    if(!err)
        throw new Error("could not update account")

    return true
}


export const insertCompare = (account) => {
    console.log("insertCompare")
    let compare = null

    compare = "compare"

    if(!compare)
        throw new Error("Compare could not be created")

    return compare
}


export const fetchSystemData = (selectedProducts) => {
    console.log("fetchSystemData")
    let sysData = null

    sysData = "sysData"

    if(!sysData)
        throw new Error("sysData not found")

    return sysData
}












export const fetchComparesByAccount = (account) => {
    console.log("fetchComparesByAccount")
    let compares:any[] = []


    return compares

}


export const fetchAccount = (user) => {
    console.log("fetchAccount")
    let account = null

    account = "account"

    if(!account)
        throw new Error("account not found")

    return account
}
