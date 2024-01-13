let allPokemon;
let currentPokemon;
let currentSearchPokemon;
let currentPokemonId = 0;
let currentPokemonPopup;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';
    let response = await fetch(url);
    allPokemon = await response.json();
    console.log('Loaded all pokemon', allPokemon); // Ausgabe der API

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

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name);
    }
    console.log('Pokemon card details', currentPokemon); // Ausgabe der API 
    disableLoadingScreen();
}

function singlePokemonTemplate(number, name) {
    return `
    <div onclick="pokemonPopup(${i})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(currentPokemon)}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
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

    openPopup();
    document.getElementById('pokemon-stats').innerHTML = popupPokemonTemplate(number, name);
    changeArrowLeft(); 
    loadBaseStats();
}

function popupPokemonTemplate(number, name) {
    return `
    <div class="pokemon-popup" onclick="closePopup()">
        <div class="closeMobile" onclick="closePopup()">Close</div>
        <div id="pokemon-popup-card${i}" class="pokemon-popup-card" onclick="notClose(event)">  
        <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(currentPokemonPopup)}
                </div>
                <div class="pokemonId">#${number}</div>   
            </div>
            <div>${name}</div>     
            <img src="img/pokemon/${number}.png" alt="">
            <div class="pokemon-info-card">
                <menu>
                    <div class="pokemon-left" onclick="pokemonPopup(currentPokemonId -1)"><img id="arrowLeft" src="./img/navigate-left.svg"></div>
                    <div class="menu">
                        <div class="menu-start" href="" onclick="loadBaseStats()">Base Stats</div>
                        <div class="menu-end" href="" id="test" onclick="loadAbout()">About</div>
                        <!-- <div class="menu-end" onclick="loadEvolution(i)">Evolution</div> -->
                    </div>
                    <div class="pokemon-right" onclick="pokemonPopup(currentPokemonId +1)"><img src="./img/navigate.svg"></div>
                </menu>
                <div id="about"></div>
            </div>
        </div>
    </div>
    `;
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

function changeArrowLeft() {
    let pokemonArrowSrc = document.getElementById('arrowLeft');
    if (currentPokemonId == 0) {
        pokemonArrowSrc.src = './img/navigate-left-end.svg';
    }
}

async function searchPokemon() {
    let search = document.getElementById('inputSearch').value;
    search = search.toLowerCase();
    pokemon = allPokemon['results'];

    let renderPokemonList = document.getElementById('pokedex');
    renderPokemonList.innerHTML = '';

    renderSearchPokemon(search, pokemon, renderPokemonList);
}

async function renderSearchPokemon(search, pokemon, renderPokemonList) {
    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentSearchPokemon = await response.json();

        const number = currentSearchPokemon['id'];
        const name = currentSearchPokemon['name'];

        if (name.toLowerCase().includes(search)) {

            renderPokemonList.innerHTML += /* html */ `
            <div onclick="pokemonPopup(${i})" class="pokemon-card">
            <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(currentSearchPokemon)}
                </div>
                <div class="pokemonId">#${number}</div>
            </div>
                <img src="img/pokemon/${number}.png" alt="">
                <div>${name}</div>      
            </div>
            `;
        }
    }
}

function disableLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}

function openPopup() {
    document.getElementById('pokemon-stats').classList.remove('d-none');
    document.getElementById('body').classList.add('hide-scrollbar');
}

function closePopup() {
    document.getElementById('pokemon-stats').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}

function notClose(event) {
    event.stopPropagation();
}
