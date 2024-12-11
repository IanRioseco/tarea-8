const pokemonContainer = document.getElementById("pokemon-container");
const errorElement = document.getElementById("error");

// Función para obtener datos de la API
const fetchPokemon = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    if (!response.ok) {
      throw new Error("Error al obtener los Pokémon");
    }

    const data = await response.json();
    const pokemonList = data.results;

    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();
        return {
          name: pokemon.name,
          image: detailData.sprites.front_default,
        };
      })
    );

    displayPokemon(pokemonDetails);
  } catch (error) {
    errorElement.textContent = "Error al cargar los Pokémon. Intenta de nuevo.";
    console.error(error);
  }
};

// Función para mostrar los Pokémon
const displayPokemon = (pokemonList) => {
  pokemonContainer.innerHTML = ""; // Limpiar contenedor
  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}" />
      <h3>${pokemon.name}</h3>
    `;
    pokemonContainer.appendChild(card);
  });
};

// Llamar a la función al cargar la página
fetchPokemon();
