const GOOGLE_MAP_KEY="";


function getMapPreivew (lat,lng){

    const imagePreviewUrl = ``;
}


export async function getAddress (lat,lng) {

    const url =``
    const response = await fetch(url);

    if(response.ok){
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}