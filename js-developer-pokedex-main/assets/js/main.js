const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput'); 

const maxRecords = 151;
const limit = 10;
let offset = 0;

let allPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        allPokemons = allPokemons.concat(pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

function filterPokemons(searchTerm) {
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    if (searchTerm) {
        filterPokemons(searchTerm);
    } else {
        const newHtml = allPokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    }
});