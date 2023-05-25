import { writable } from "svelte/store";




export const userCountry = writable("");
export const userAmazonDomain = writable("");
export const messages = writable([]);
export const selectedProducts = writable([]);


// key = domain/keyword
export const searchCache = writable({})

// key = domain/asin
export const productInfoCache = writable({})

// key = domain/asin
export const productReviewsCache = writable({})
