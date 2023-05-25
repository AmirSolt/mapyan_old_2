import { getCountryForTimezone } from "countries-and-timezones";
import { userCountry, userAmazonDomain} from './stores';



export async function loadUserCountry(){

    let country = getUserCountry();


    userCountry.update(value => {
        if(!value){
            return country
        }
        return value
	});


    userAmazonDomain.update(value => {
        if(!value){
            return countryToDomain(country)
        }
        return value
	});
}

function getUserCountry() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryInfo = getCountryForTimezone(tz);
    if(!countryInfo) return null;
    return countryInfo.id;
}


function countryToDomain(country){
    switch(country){
        case 'US':
            return 'amazon.com'
        case 'UK':
            return 'amazon.co.uk'
        case 'CA':
            return 'amazon.ca'
        case 'AU':
            return 'amazon.com.au'
        case 'IN':
            return 'amazon.in'
        case 'MX':
            return 'amazon.com.mx'
        case 'BR':
            return 'amazon.com.br'
        case 'SG':
            return 'amazon.sg'
        case 'TR':
            return 'amazon.com.tr'
        case 'AE':
            return 'amazon.ae'
        case 'SA':
            return 'amazon.sa'
        case 'NL':
            return 'amazon.nl'
        case 'DE':
            return 'amazon.de'
        case 'FR':
            return 'amazon.fr'
        case 'ES':
            return 'amazon.es'
        case 'IT':
            return 'amazon.it'
        case 'JP':
            return 'amazon.co.jp'
        case 'SE':
            return 'amazon.se'
        default:
            return 'amazon.com'
    }
}