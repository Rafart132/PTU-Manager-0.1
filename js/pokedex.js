const lista = document.getElementById("pokedex-lista");
const buscador = document.getElementById("buscador");
let todos = [];

async function cargarPokedex() {
    try {
        const respuesta = await fetch("data/pokedex.json");
        const datos = await respuesta.json();
        todos = datos.pokemon;
        mostrarPokemon(todos);
    } catch (error) {
        lista.textContent = "No se pudo cargar la Pokédex.";
        console.error(error);
    }
}

function mostrarPokemon(pokemon) {
    lista.innerHTML = "";

    if (pokemon.length === 0) {
        lista.textContent = "No se encontró ningún Pokémon.";
        return;
    }

    pokemon.forEach(function (p) {
        lista.appendChild(crearTarjeta(p));
    });
}

buscador.addEventListener("input", function () {
    const texto = buscador.value.toLowerCase();
    const filtrados = todos.filter(function (p) {
        const nombre = p.nombre + " " + (p.forma || "");
        return p.Nombre.toLowerCase().includes(texto);
    });
    mostrarPokemon(filtrados);
});

function mostrarPokemon(pokemon) {
    lista.innerHTML = "";

    pokemon.forEach(function (p) {
        lista.appendChild(crearTarjeta(p));
    });
}

function crearTarjeta(p) {
    const tarjeta = document.createElement("a");
        tarjeta.className = "pokemon-card";
        tarjeta.href = "pokemon.html?id=" + p.Id;

    const tipos = [p.Tipo1, p.Tipo2].filter(Boolean);
    const etiquetasTipo = tipos
        .map(function (t) { return '<span class="type-tag">' + t + "</span>"; })
        .join("");

    const stats = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"]
        .map(function (s) {
            return "<div><small>" + s + "</small><strong>" + p[s] + "</strong></div>";
        })
        .join("");
    
    const etiquetaForma = p.Forma
    ? '<p class="forma">' + p.Forma + "</p>"
    : "";

    tarjeta.innerHTML =
        "<h3>" + p.Nombre + "</h3>" + etiquetaForma +
        '<div class="type-list">' + etiquetasTipo + "</div>" +
        '<div class="stat-grid">' + stats + "</div>";

    return tarjeta;
}

cargarPokedex();