import { getCountryForTimezone } from "countries-and-timezones";
import { userCountry} from './stores';




export function getUserCountry() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryInfo = getCountryForTimezone(tz);
    if(!countryInfo) return null;
    return countryInfo.id;
}





export async function loadUserCountry(){
    userCountry.update(value => {
        if(!value){
            return getUserCountry();
        }
        return value
	});
}
