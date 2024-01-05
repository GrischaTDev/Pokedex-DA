let allPokemon;
let currentPokemon;
let currentPokemonId = 0;
let currentPokemonPopup;
let typeCollor = ['green', 'poison']

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
    let response = await fetch(url);
    allPokemon = await response.json();

    console.log('Loaded pokemon list', allPokemon); // Ausgabe der API

    renderAllPokemon();
}

async function renderAllPokemon() {
    pokemon = allPokemon['results'];

    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();

        const number = currentPokemon['id'];
        const name = currentPokemon['name'];


        document.getElementById('pokedex').innerHTML += /* html */ `
        <div onclick="pokemonPopup(${i})" class="pokemon-card">
        <div class="type-card">
            <div class="types-content">
                ${typeTemplate(currentPokemon)}
            </div>
            <div class="pokemonId">#${number}</div>
        </div>
            <img src="img/pokemon/${i + 1}.png" alt="">
            <div>${name}</div>      
        </div>
        `;
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API  
}

function typeTemplate(pokemon) {        
    const types = pokemon['types'];
    let htmlText = "";
    for (let j = 0; j < types.length; j++) {
        htmlText += `
        <div class="${types[j]['type']['name']}">
            <div>${types[j]['type']['name']}</div>
        </div>
        `;
    }
    return htmlText;
}

async function pokemonPopup(i) {
    let pokemonUrl = pokemon[i]['url'];
    let response = await fetch(pokemonUrl);
    currentPokemonPopup = await response.json();

    currentPokemonId = i;
    const number = currentPokemonPopup['id'];
    const name = currentPokemonPopup['name'];


    document.getElementById('pokemon-stats').classList.remove('d-none');
    document.getElementById('body').classList.add('hide-scrollbar');

    document.getElementById('pokemon-stats').innerHTML = /* html */ `
    <div class="pokemon-popup" onclick="closePopup()">
        <div id="pokemon-popup-card${i}" class="pokemon-popup-card" onclick="notClose(event)">  
        <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(currentPokemonPopup)}
                </div>
                <div class="pokemonId">#${number}</div>   
            </div>
            <div>${name}</div>     
            <img src="img/pokemon/${i + 1}.png" alt="">
            <div class="pokemon-info-card">
                <menu>
                    <div class="pokemon-left" onclick="pokemonPopup(currentPokemonId -1)"><img src="./img/navigate-left.svg"></div>
                    <div class="menu">
                        <div class="menu-start" href="" id="test" onclick="loadAbout()">About</div>
                        <div class="menu-middle" href="" onclick="loadBaseStats()">Base Stats</div>
                        <div class="menu-end" onclick="loadEvolution(i)">Evolution</div>
                    </div>
                    <div class="pokemon-right" onclick="pokemonPopup(currentPokemonId +1)"><img src="./img/navigate.svg"></div>
                </menu>
                <div id="about"></div>
            </div>
        </div>
        </div>
    </div>
    `;
    
    if (currentPokemonId == 0) {
        currentPokemonId++;
    }

    loadAbout();
}

function loadAbout() {
    const species = currentPokemonPopup['species']['name'];
    const height = currentPokemonPopup['height'];
    const weight = currentPokemonPopup['weight'];

    document.getElementById('about').innerHTML = /* html */`

    <div id="about-info">
        <div class="about-row">
            <div class="about-left">Species</div><div class="about-right">${species}</div>
        </div>
        <div class="about-row">
            <div class="about-left">Height</div><div class="about-right">${height}</div>
        </div>
        <div class="about-row">
            <div class="about-left">Weight</div><div class="about-right">${weight}</div>
        </div>  
    </div>
    `;
}

function loadBaseStats() {
    const baseStats = currentPokemonPopup['stats'];
    document.getElementById('about').innerHTML = '';

    for (s = 0; s < baseStats.length; s++) {
        const baseStatName = baseStats[s]['stat']['name'];
        const baseStatValue = baseStats[s]['base_stat'];


        document.getElementById('about').innerHTML += /* html */`

        <div class="base-stats-row">
            <div class="base-stats-left">${baseStatName}</div>
            <div>${baseStatValue}</div>
            <div class="progress base-stats-right" role="progressbar" aria-label="Basic example" aria-valuenow="${baseStatValue}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${baseStatValue}%"></div>
            </div>
        </div>
        `;
    }
}

async function loadEvolution(i) {
    // let url = `https://pokeapi.co/api/v2/evolution-chain/${i}`;
    let speciesURL = currentPokemonPopup['species']['url'];
    let response = await fetch(speciesURL);
    let evolve = await response.json();

    let url2 = evolve['evolution_chain']['url'];
    let response2 = await fetch(url2);
    let evolve2 = await response2.json();
    

    console.log('Loaded pokemon evolve', evolve); // Ausgabe der API
    console.log('Loaded pokemon evolve', evolve2['chain']['evolves_to']); // Ausgabe der API
}




// let evolutions = allPokemon[index].species.url.chain.evolves_to.length;


// let speciesURL = allPokemon[index].species.url;
// let speciesData = fetch(speciesURL)






function searchPokemon() {
    document.getElementById('pokemon-search').classList.remove('d-none');
}

function closePopup() {
    document.getElementById('pokemon-stats').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}

function notClose(event) {
    event.stopPropagation();
}
