
export const getMyIpGeolocation = () => {
    return fetch('https://ipapi.co/json/').then(response => response.json()).then(json => {
        if (json.error) throw new Error("Error getting ip geolocation: " + json.reason);
        const city = json.city || "";
        const region = json.region || "";
        const country = json.country || "";
        return {
            address: `${city}, ${region}, ${country}`,
            gps: (json.latitude && json.longitude) ? `${json.latitude}, ${json.longitude}` : null
        }
    })
}


// ---- ALTERNATIVE GEOLOCATION SERVICE: ----
// export const getMyIpGeolocation = () => {
//     return fetch('http://ip-api.com/json/?fields=status,message,country,region,regionName,city,district,zip,lat,lon,query').then(response => response.json()).then(json => {
//         if (json.status === "fail") throw new Error("Error getting ip geolocation: " + json.message);
//         const district = json.district || "";
//         const city = json.city || "";
//         const region = json.regionName || "";
//         const country = json.country || "";
//         return {
//             address: `${district}, ${city}, ${region}, ${country}`,
//             gps: (json.lat && json.lon) ? `${json.lat}, ${json.lon}` : null
//         }
//     })
// }
