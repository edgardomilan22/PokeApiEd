const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";

function fetchAndDisplayPokemon(botonId) {
    listaPokemon.innerHTML = ""; // Limpiar la lista de pokémon antes de mostrar los resultados
    const requests = []; // Array de promesas reiniciado en cada clic

    // Hacer todas las solicitudes y almacenar las promesas en un array
    for (let i = 1; i <= 155; i++) {
        requests.push(fetch(URL + i).then(response => response.json()));
    }

    // Esperar a que todas las promesas se resuelvan y luego filtrar y mostrar los resultados
    Promise.all(requests).then(pokemones => {
        pokemones.sort((a, b) => a.id - b.id); // Ordenar los pokemones por id
        pokemones.forEach(poke => {
            const tipos = poke.types.map(type => type.type.name);
            if (botonId == "ver-todos") {
                mostrarPokemon(poke);
            }
            else if (tipos.includes(botonId)) { // Filtrar por tipo
                mostrarPokemon(poke);
            }
        });
    });
}

function mostrarPokemon(poke) {
    let tipo = poke.types.map((type) =>
        ` <p class="${type.type.name} tipo"> ${type.type.name}</p>`);
    tipo = tipo.join('');

    let pokeId = poke.id.toString().padStart(3, '0'); // Formatear el id del pokémon

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}"
                            alt="pikachu">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemonid">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${poke.name}</h2>
                        </div>
                        <div class="pokemon-tipo">
                            ${tipo}
                        </div>
                    </div>`;

    listaPokemon.append(div);
}


botonesHeader.forEach(boton => {
    boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        fetchAndDisplayPokemon(botonId);
    });
});

fetchAndDisplayPokemon("ver-todos")