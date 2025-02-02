const pokemonName = document.querySelector('.pokemon__name');  
const pokemonNumber = document.querySelector('.pokemon__number'); 
const pokemonImage = document.querySelector('.pokemon__image'); 

const form = document.querySelector('.form'); 
const input = document.querySelector('.input__search'); 

// Botões de navegação
const buttonPrev = document.querySelector('.button-prev'); 
const buttonNext = document.querySelector('.button-next'); 

let searchPokemon = 1; // Começa no primeiro Pokémon

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!APIResponse.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const data = await APIResponse.json();
        return data;
    } catch (error) {
        return null; // Retorna null para indicar erro
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = ''; // Remove a imagem temporariamente

    const data = await fetchPokemon(pokemon);

    if (data) {
        searchPokemon = data.id; // Atualiza o ID do Pokémon atual
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    } else {
        pokemonImage.sty.display = 'none'
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = ''; // Remove a imagem caso o Pokémon não seja encontrado
    }
}

// Evento de busca manual
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = "";
});

// Evento do botão "anterior"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { // Evita números negativos
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Evento do botão "próximo"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Inicializa com o primeiro Pokémon
document.addEventListener("DOMContentLoaded", () => {
    renderPokemon(searchPokemon);
});
