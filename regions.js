let allRegions; // Alle Regionen aus Pokemon.
////////////////////////////////////////////////
let regionKanto; // Region Kanto.
let currentKantoPokemon;
let currentKantoPokemonId;
let currentPokemonIdKanto = 0;
////////////////////////////////////////////////


async function loadRegions() {
    let url = 'https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32';
    let response = await fetch(url);
    allRegions = await response.json();
    allRegions = allRegions['results'];
    console.log('Alle Regionen', allRegions);

    loadRegionKanto();
}

async function loadRegionKanto() {
    let kantoUrl = allRegions[1]['url'];
    let response = await fetch(kantoUrl);
    regionKanto = await response.json();
    console.log('Kanto', regionKanto); // Ausgabe der API 
}

async function renderKantoPokemon() {
    let kantoPokemons = regionKanto['pokemon_entries']
    document.getElementById('pokedex').innerHTML = '';

    changeHeader();

    for (let i = 0; i < kantoPokemons.length; i++) {
        let kantoPokemonUrl = kantoPokemons[i]['pokemon_species']['url'];
        let response = await fetch(kantoPokemonUrl);
        currentKantoPokemonId = await response.json();
        let kantoId = currentKantoPokemonId['id'];
        // Hier wird die Normale Pokemon API mit der ID der Pokemon aus dem Kanto Pokedex geladen.
        let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + kantoId;
        let response2 = await fetch(pokemonUrl);
        currentKantoPokemon = await response2.json();
        
        let number = currentKantoPokemon['id']
        let name = currentKantoPokemon['name']

        document.getElementById('pokedex').innerHTML += singlePokemonTemplateKanto(number, name, i, currentKantoPokemon);
        
    }
    console.log('Kanto Pokemon details', currentKantoPokemon);
}

function singlePokemonTemplateKanto(number, name, i) {
    return `
    <div onclick="pokemonPopup(${i})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(currentKantoPokemon)}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}


function changeHeader() {
    let header = document.getElementById('header-img');
    header.innerHTML = /* html */ `
    <div>Kanto</div>
    `;
}