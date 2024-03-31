load();

function startDragging(i) {
    currentDraggedPokemon = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo() {
    allCatchedPokemon.push({ name: allPokemonData[currentDraggedPokemon]['name'], data: allPokemonData[currentDraggedPokemon]['data']});
    renderAllDraggedPokemon();
    save();
}

function renderAllDraggedPokemon() {
    document.getElementById('catch-me').innerHTML = '';
  
    for (let f = 0; f < allCatchedPokemon.length; f++) {
        let number = allCatchedPokemon[f]['data']['id'];
        let name = allCatchedPokemon[f]['name'];
        document.getElementById('catch-me').innerHTML += singlePokemonTemplateDragged(f, number, name);
    }

    if (allCatchedPokemon.length > 0) {
        let catchedInfo = document.getElementById('catch-me-info');
        catchedInfo.innerHTML = '';
        catchedInfo.innerHTML = /* html */ `
            <span class="catched">Catched: ${allCatchedPokemon.length}</span>
            <div class="clear-catched-btn" onclick="clearCatchedPokemon()">Clear all</div>
        `;
    } else {
        let catchedInfo = document.getElementById('catch-me-info');
        catchedInfo.innerHTML = '';
        catchedInfo.innerHTML = /* html */ `
            <span>Catch your favorite pokemon <br>with drag and drop!</span>
            <img src="img/pfeil.svg" alt="">
        `;
    }
}


function singlePokemonTemplateDragged(i, number, name) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" onclick="pokemonPopup(${number-1})" class="pokemon-card-drag">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(allCatchedPokemon[i])}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}


function clearCatchedPokemon() {
    localStorage.clear();
    allCatchedPokemon = [];
    renderAllDraggedPokemon();
}


function save() {
    let catchedPokemon = JSON.stringify(allCatchedPokemon);
    localStorage.setItem('Catched Pokemon', catchedPokemon);
}


function load() {
    let catchedPokemon = localStorage.getItem('Catched Pokemon');
    if (catchedPokemon) {
        allCatchedPokemon = JSON.parse(catchedPokemon);
    }

}