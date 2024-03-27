let completePokemon;
let allPokemonData = []; // Alle Pokemon die es in der API gibt!
let limit = 20;
let set = 0;
///////////////////////////////////////////////////////////////////////////////////////////
let currentPokemon;
let currentSearchPokemon;
let loadMorePokemon = 20;
let stopScroll = false;
///////////////////////////////////////////////////////////////////////////////////////////


async function initAllPokemon() {
    await loadCompletePokemon();
    renderAllPokemon();
    startLoadCompletePokemon();
}


async function loadCompletePokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${set}&limit=${limit}`;
    let response = await fetch(url);
    completePokemon = await response.json();
    completePokemon = completePokemon['results'];

    for (i = 0; i < completePokemon.length; i++) {
        let pokemonUrl = completePokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        let currentAllPokemon = await response.json();
        allPokemonData.push({ name: currentAllPokemon['name'], data: currentAllPokemon });
    }
    console.log('Alle Pokemon daten', allPokemonData);
}


function startLoadCompletePokemon() {
    set = 20;
    limit = 1000;
    loadCompletePokemon();
}


async function renderAllPokemon() {
    nextPokemon = loadMorePokemon - 20;
    for (i = nextPokemon; i < loadMorePokemon; i++) {
        currentPokemon = allPokemonData[i]['data'];
        let number = currentPokemon['id'];
        let name = currentPokemon['name'];

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(i, number, name);
    }
    stopScroll = false;
    disableLoadingScreen();
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !stopScroll) {  
        loadMorePokemon += 20;
        stopScroll = true;             
        renderAllPokemon();
    }
});


function singlePokemonTemplate(i, number, name) {
    return `
    <div onclick="pokemonPopup(${i})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(allPokemonData[i])}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}


function typeTemplate(allPokemonData) {
    const types = allPokemonData['data']['types'];
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
    if (i == -1) {
        return;
    }

    let number = allPokemonData[i]['data']['id'];
    let name = allPokemonData[i]['data']['name'];

    document.getElementById('pokemon-stats').innerHTML = `
    <div class="pokemon-popup" onclick="closePopup()">
        <div class="closeMobile" onclick="closePopup()">Close</div>
        <div id="pokemon-popup-card${i}" class="pokemon-popup-card" onclick="notClose(event)">  
        <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(allPokemonData[i])}
                </div>
                <div class="pokemonId">#${number}</div>   
            </div>
            <div>${name}</div>     
            <img src="img/pokemon/${number}.png" alt="">
            <div class="pokemon-info-card">
                <menu>
                    <div class="pokemon-left" onclick="pokemonPopup(${i -1})"><img id="arrowLeft" src="./img/navigate-left.svg"></div>
                    <div class="menu">
                        <div class="menu-start" href="" onclick="loadBaseStats(${i})">Base Stats</div>
                        <div class="menu-end" href="" id="test" onclick="loadAbout(${i})">About</div>
                    </div>
                    <div class="pokemon-right" onclick="pokemonPopup(${i +1})"><img src="./img/navigate.svg"></div>
                </menu>
                <div id="about"></div>
            </div>
        </div>
    </div>
    `;

    openPopup();
    changeArrowLeft(i); 
    loadBaseStats(i);
}


function loadAbout(i) {
    let species = allPokemonData[i]['data']['species']['name'];
    let height = allPokemonData[i]['data']['height'];
    let weight = allPokemonData[i]['data']['weight'];

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

function loadBaseStats(i) {
    let baseStats = allPokemonData[i]['data']['stats'];
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


function changeArrowLeft(i) {
    let pokemonArrowSrc = document.getElementById('arrowLeft');
    if (allPokemonData[i]['data']['id'] == 1) {
        pokemonArrowSrc.src = './img/navigate-left-end.svg';
    }
}


async function searchPokemon() {
    let search = document.getElementById('inputSearch').value;
    search = search.toLowerCase();
    let renderPokemonList = document.getElementById('pokedex');
    renderPokemonList.innerHTML = '';

    renderSearchPokemon(search, renderPokemonList);
}


async function renderSearchPokemon(search, renderPokemonList) {
    for (let i = 0; i < allPokemonData.length; i++) {
        const number = allPokemonData[i]['data']['id'];
        const name = allPokemonData[i]['data']['name'];

        if (name.includes(search)) {
            renderPokemonList.innerHTML += /* html */ `
            <div onclick="pokemonPopup(${i})" class="pokemon-card">
            <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(allPokemonData[i])}
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

