// let allRegions; // Alle Regionen aus Pokemon.
// ////////////////////////////////////////////////
// let regionKanto; // Region Kanto.
// let currentKantoPokemon;
// let currentKantoPokemonId;
// let currentPokemonIdKanto = 0;
// let headerTitel;
// ////////////////////////////////////////////////


// async function loadRegions(currentRegion) {
//     let url = 'https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32';
//     let response = await fetch(url);
//     allRegions = await response.json();
//     allRegions = allRegions['results'];
//     loadRegionKanto(currentRegion);
// }

// function renderRegion(currentRegion, name) {
//     headerTitel = name;
//     loadRegionKanto(currentRegion)
// }

// async function loadRegionKanto(currentRegion) {
//     let kantoUrl = allRegions[currentRegion]['url'];
//     let response = await fetch(kantoUrl);
//     regionKanto = await response.json();
//     renderKantoPokemon()
// }

// async function renderKantoPokemon() {
//     let kantoPokemons = regionKanto['pokemon_entries']
//     disableLoadingScreen();
//     for (let i = nextPokemon; i < loadMorePokemon; i++) {
//         let kantoPokemonUrl = kantoPokemons[i]['pokemon_species']['url'];
//         let response = await fetch(kantoPokemonUrl);
//         currentKantoPokemonId = await response.json();
//         let kantoId = currentKantoPokemonId['id'];
//         // Hier wird die Normale Pokemon API mit der ID der Pokemon aus dem Kanto Pokedex geladen.
//         await loadAllPokemonApi(kantoId);

//         let number = currentKantoPokemon['id'];
//         let arrayNumber = currentKantoPokemon['id']-1;
//         let name = currentKantoPokemon['name'];
//         let listNumber = i+1;

//         document.getElementById('pokedex').innerHTML += singlePokemonTemplateKanto(number, name, arrayNumber, listNumber);
//     }
//     stopScroll = false;
//     disableLoadingScreen();
// }

// function singlePokemonTemplateKanto(number, name, arrayNumber, listNumber) {
//     return `
//     <div onclick="pokemonPopup(${arrayNumber})" class="pokemon-card">
//     <div class="type-card">
//         <div class="types-content">
//             ${typeTemplate(currentKantoPokemon)}
//         </div>
//         <div class="pokemonId">#${listNumber}</div>
//     </div>
//         <img src="img/pokemon/${number}.png" alt="">
//         <div>${name}</div>      
//     </div>
//     `;
// }

// async function loadAllPokemonApi(kantoId) {
//     let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + kantoId;
//     let response2 = await fetch(pokemonUrl);
//     currentKantoPokemon = await response2.json();
//     return currentKantoPokemon;
// }


// window.addEventListener('scroll', () => {
//     const currentPageUrl = window.location.href;
//     if (!currentPageUrl.includes('/index.html') && window.innerHeight + window.scrollY >= document.body.offsetHeight && !stopScroll) {  
//         loadMorePokemon += 20;
//         nextPokemon += 20;
//         stopScroll = true;             
//         renderKantoPokemon();
//     }
// });