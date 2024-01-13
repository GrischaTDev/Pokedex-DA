let allRegions;
let kanto;
let johto;
let hoenn;


async function loadRegions() {
    let url = 'https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32';
    let response = await fetch(url);
    allRegions = await response.json();
    console.log('Loaded all regions', allRegions); // Ausgabe der API

    loadRegionKanto();
    loadRegionJohto();
    loadRegionHoenn()
}

async function loadRegionKanto() {
    region = allRegions['results'];

    let regionsUrl = region[1]['url'];
    let response = await fetch(regionsUrl);
    regionKanto = await response.json();
    kanto = regionKanto;
    console.log('Kanto regions details', regionKanto); // Ausgabe der API 
}

async function loadRegionJohto() {
    region = allRegions['results'];

    let regionsUrl = region[2]['url'];
    let response = await fetch(regionsUrl);
    regionJohto = await response.json();
    johto = regionJohto;
    console.log('Johto regions details', regionJohto); // Ausgabe der API 
}

async function loadRegionHoenn() {
    region = allRegions['results'];

    let regionsUrl = region[3]['url'];
    let response = await fetch(regionsUrl);
    regionHoenn = await response.json();
    hoenn = regionHoenn;
    console.log('Hoenn regions details', regionHoenn); // Ausgabe der API 
}
