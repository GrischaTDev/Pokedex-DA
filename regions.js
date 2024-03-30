let regionAllPokemon;
let allRegionPokemonData = []; // Alle Pokemon die es in der API gibt!

////////////////////////////////////////////////
let startIndex = 0;
let endIndex = 20;

loadMorePokemon = 20;
nextPokemon = 0;
////////////////////////////////////////////////
progressBarNone = document.getElementById('progress-bar');

async function initAllRegionPokemon(currentRegion) {
    await loadRegion(currentRegion);
    renderRegionPokemon();
    startLoadCompleteRegionPokemon();
    startLoadCompletePokemon();
}


async function loadRegion(currentRegion) {
    let regionsUrl = `https://pokeapi.co/api/v2/pokedex/${currentRegion}`;
    let response = await fetch(regionsUrl);
    let regionLoaded = await response.json();
    regionAllPokemon = regionLoaded['pokemon_entries'];

    await loadRegionPokemon();
    
}

async function loadRegionPokemon() {
    allRegionPokemonData = [];
    const promises = [];

    for (let h = startIndex; h < endIndex; h++) { 
        let pokemonUrl = regionAllPokemon[h]['pokemon_species']['url'];
        let response = await fetch(pokemonUrl);
        let currentRegionPokemon = await response.json();

        let regionPokemonId = currentRegionPokemon['id'];
        promises.push(loadAllPokemonApi(regionPokemonId));
    }
    await Promise.all(promises);
}

function startLoadCompleteRegionPokemon() {
    endIndex = regionAllPokemon.length;
    loadRegionPokemon();
}


async function loadAllPokemonApi(regionPokemonId) {
    let allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + regionPokemonId;
    let response2 = await fetch(allPokemonUrl);
    let currenRegionPokemon = await response2.json();
    allRegionPokemonData.push({ name: currenRegionPokemon['name'], data: currenRegionPokemon});
}


function renderRegionPokemon() {
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

function loadMoreRegion() {
    let remainingPokemon = allRegionPokemonData.length - loadMorePokemon;

    if (remainingPokemon <= 0) {
        console.log('Maximale Länge erreicht!');
        return; 
    }
    if (remainingPokemon > 20) {
        loadMorePokemon += 20;
        nextPokemon += 20;
        renderRegionPokemon(); 
    } else {
        loadMorePokemon = allRegionPokemonData.length;
        renderRegionPokemon(); 
    }
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) { 
        loadMoreRegion();
    }
});
