let allRegions;
// let kanto;
// let currentKantoPokemon;
// let johto;
// let hoenn;


async function loadKantoPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
    let response = await fetch(url);
    allPokemon = await response.json();
    console.log('Loaded all Kanto pokemon', allPokemon); // Ausgabe der API

    kantoPokemon();
}

async function kantoPokemon() {
    pokemon = allPokemon['results'];
    document.getElementById('pokedex').innerHTML = '';

    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        const number = currentPokemon['id'];
        const name = currentPokemon['name'];

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name);
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API 

    loadRegions();

}

async function loadJohtoPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100';
    let response = await fetch(url);
    allPokemon = await response.json();
    console.log('Loaded all Johto pokemon', allPokemon); // Ausgabe der API

    johto();
}

async function johto() {
    pokemon = allPokemon['results'];
    document.getElementById('pokedex').innerHTML = '';

    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        const number = currentPokemon['id'];
        const name = currentPokemon['name'];

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name);
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API 

    loadRegions();
}

async function loadHoennPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135';
    let response = await fetch(url);
    allPokemon = await response.json();
    console.log('Loaded all Hoenn pokemon', allPokemon); // Ausgabe der API

    hoenn();
}

async function hoenn() {
    pokemon = allPokemon['results'];
    document.getElementById('pokedex').innerHTML = '';

    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        const number = currentPokemon['id'];
        const name = currentPokemon['name'];

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name);
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API 

    loadRegions();
}

async function loadSinnohPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=101';
    let response = await fetch(url);
    allPokemon = await response.json();
    console.log('Loaded all Sinnoh pokemon', allPokemon); // Ausgabe der API

    sinnoh();
}

async function sinnoh() {
    pokemon = allPokemon['results'];
    document.getElementById('pokedex').innerHTML = '';

    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        const number = currentPokemon['id'];
        const name = currentPokemon['name'];

        let id = i+1;

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name, id);
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API 

    loadRegions();
}






async function loadRegions() {
    let url = 'https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32';
    let response = await fetch(url);
    allRegions = await response.json();
    loadRegionKanto();
}

async function loadRegionKanto() {
    region = allRegions['results'];

    let regionsUrl = region[5]['url'];
    let response = await fetch(regionsUrl);
    regionKanto = await response.json();
    kanto = regionKanto;
    console.log('regions details', kanto); // Ausgabe der API 
}




// async function loadKantoPokedex() {
//     let kantoPokemonsList = kanto['pokemon_entries']
//     console.log('Kanto Pokemons', kantoPokemonsList);
//     document.getElementById('pokedex').innerHTML = '';

//     for (let i = 0; i < kantoPokemonsList.length; i++) {
//         let kantoPokemonUrl = kantoPokemonsList[i]['pokemon_species']['url'] + '?limit=20&offset=20';
//         let response = await fetch(kantoPokemonUrl);
//         currentKantoPokemon = await response.json();
        

//         const name = currentKantoPokemon['name'];
//         const number = currentKantoPokemon['id'];
//         let id = i+1;

//         document.getElementById('pokedex').innerHTML += singlePokemonTemplate2(number, name, id);
        
//     }
//     console.log('Kanto Pokemon details', currentKantoPokemon);
// }

// function singlePokemonTemplate2(number, name, id) {
//     return `
//     <div onclick="pokemonPopup(${i})" class="pokemon-card">
//     <div class="type-card">
//         <div class="types-content">
//         </div>
//         <div class="pokemonId">#${id}</div>
//     </div>
//         <img src="img/pokemon/${number}.png" alt="">
//         <div>${name}</div>      
//     </div>
//     `;
// }




// async function loadRegionJohto() {
//     region = allRegions['results'];

//     let regionsUrl = region[2]['url'];
//     let response = await fetch(regionsUrl);
//     regionJohto = await response.json();
//     johto = regionJohto;
//     // console.log('Johto regions details', regionJohto); // Ausgabe der API 
// }

// async function loadRegionHoenn() {
//     region = allRegions['results'];

//     let regionsUrl = region[3]['url'];
//     let response = await fetch(regionsUrl);
//     regionHoenn = await response.json();
//     hoenn = regionHoenn;
//     // console.log('Hoenn regions details', regionHoenn); // Ausgabe der API 
// }
