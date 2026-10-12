const id = new URLSearchParams(window.location.search).get("id");

function fila(etiqueta, valor) {
    const texto = (valor == null || valor === "") ? "—" : valor;
    return '<div class="ficha-fila"><span>' + etiqueta +
           "</span><strong>" + texto + "</strong></div>";
}

function seccion(titulo, contenido) {
    return '<section class="ficha-seccion"><h2>' + titulo + "</h2>" +
           contenido + "</section>";
}

function mostrarFicha(p) {
    const tipos = [p.Tipo1, p.Tipo2].filter(Boolean).join(" / ");

    const general =
        fila("Tipos", tipos) +
        fila("Tamaño", p.Tamaño) +
        fila("Altura", p.Altura != null ? p.Altura + " m" : null) +
        fila("Peso", p.Peso != null ? p.Peso + " kg" : null) +
        fila("Clase de peso", p.WeightClass) +
        fila("Dieta", (p.Dieta || []).join(", ")) +
        fila("Hábitat", (p.Habitat || []).join(", "));

    document.getElementById("ficha").innerHTML =
        seccion("Información general", general);
}

async function cargarFicha() {
    const respuesta = await fetch("data/pokedex.json");
    const datos = await respuesta.json();
    const p = datos.pokemon.find(function (x) { return x.Id === id; });

    if (!p) {
        document.getElementById("ficha-nombre").textContent = "Pokémon no encontrado";
        return;
    }

    document.getElementById("ficha-nombre").textContent =
        p.Nombre + (p.Forma ? " · " + p.Forma : "");

    mostrarFicha(p);
}

cargarFicha();