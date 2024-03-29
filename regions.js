let allRegions; // Alle Regionen aus Pokemon.
let allRegionPokemonData = []; // Alle Pokemon die es in der API gibt!
////////////////////////////////////////////////
let regionKanto; // Region Kanto.

let currentKantoPokemonId;
let currentPokemonIdKanto = 0;
let headerTitel;
////////////////////////////////////////////////

async function initRegionPokemon(currentRegion) {
    await loadAllRegions(currentRegion);
    startLoadCompletePokemon();
}

async function loadAllRegions(currentRegion) {
    let url = `https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32`;
    let response = await fetch(url);
    allRegions = await response.json();
    allRegions = allRegions['results'];
    loadRegion(currentRegion);
}

async function loadRegion(currentRegion) {
    let regionsUrl = allRegions[currentRegion]['url'];
    let response = await fetch(regionsUrl);
    let regionLoaded = await response.json();
    let regionAllPokemon = regionLoaded['pokemon_entries'];

    for (h = 0; h < regionAllPokemon.length; h++) {
        let pokemonUrl = regionAllPokemon[h]['pokemon_species']['url'];
        let response = await fetch(pokemonUrl);
        let currentRegionPokemon = await response.json();
        let regionPokemonId = currentRegionPokemon['id'];
        let germanPokemonName = currentRegionPokemon['names'][5]['name'];
        loadAllPokemonApi(regionPokemonId, germanPokemonName)
    }
    renderRegionPokemon();
}

async function loadAllPokemonApi(regionPokemonId, germanPokemonName) {
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + regionPokemonId;
    let response2 = await fetch(pokemonUrl);
    let currentKantoPokemon = await response2.json();
    allRegionPokemonData.push({ name: germanPokemonName, data: currentKantoPokemon});
}

function renderRegionPokemon() {
    disableLoadingScreen();
    for (let i = nextPokemon; i < loadMorePokemon; i++) {
        let number = allRegionPokemonData[i]['data']['id'];
        let name = allRegionPokemonData[i]['name'];


        document.getElementById('pokedex').innerHTML += singlePokemonTemplateKanto(i, number, name);
    }
    stopScroll = false;
    disableLoadingScreen();
}

function singlePokemonTemplateKanto(i, number, name) {
    return `
    <div onclick="pokemonPopup(${number-1})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(allRegionPokemonData[i])}
        </div>
        <div class="pokemonId">#${i+1}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}




// window.addEventListener('scroll', () => {
//     const currentPageUrl = window.location.href;
//     if (!currentPageUrl.includes('/index.html') && window.innerHeight + window.scrollY >= document.body.offsetHeight && !stopScroll) {  
//         loadMorePokemon += 20;
//         nextPokemon += 20;
//         stopScroll = true;             
//         renderKantoPokemon();
//     }
// });