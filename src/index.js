document.addEventListener('DOMContentLoaded', () => {
  const pokemonCardsContainer = document.getElementById('pokemon-container')
  const searchField = document.getElementById('pokemon-search-input')
  let allPokemonData = []

  searchField.addEventListener('input', function(event) {
    const userSearch = event.target.value
    const filteredPokemon = allPokemonData.filter(function(pokemonObject) {
      return pokemonObject.name.includes(userSearch)
    })
    const pokeHTML = renderAllPokemon(filteredPokemon)
    pokemonCardsContainer.innerHTML = pokeHTML
  })

  pokemonCardsContainer.addEventListener('click', function(event) {
    if (event.target.dataset.action === 'flip') {
      const clickedPokemon = allPokemonData.find(function(pokemonObject) {
        return pokemonObject.id === parseInt(event.target.dataset.id)
      })
      if (event.target.src === clickedPokemon.sprites.front) {
        event.target.src = clickedPokemon.sprites.back
      } else {
        event.target.src = clickedPokemon.sprites.front
      }
    }
  })

  fetch('http://localhost:3000/pokemon', { method: 'Get' })
    .then((responseObject) => responseObject.json())
    .then(function(parsedPokeJSON) {
      allPokemonData = parsedPokeJSON
      pokemonCardsContainer.innerHTML = renderAllPokemon(parsedPokeJSON)
    })
}) //end of DOM content load

function renderAllPokemon(pokeCollection) {
  return pokeCollection.map(function(pokemonObject) {
    return `
    <div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemonObject.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img data-id="${pokemonObject.id}" data-action="flip" class="toggle-sprite" src="${pokemonObject.sprites.front}">
          </div>
        </div>
      </div>
    </div>
    `
  }).join('')
}
