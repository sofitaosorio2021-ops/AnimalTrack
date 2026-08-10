function mostrarSeccion(seccion) {

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll(".page-section");

    secciones.forEach(function(elemento) {
        elemento.style.display = "none";
    });

    // Mostrar la sección seleccionada
    const seccionSeleccionada = document.getElementById(seccion);

    if (seccionSeleccionada) {
        seccionSeleccionada.style.display = "block";
    }
}


// ================================
// MENÚ LATERAL
// ================================

const botonesMenu = document.querySelectorAll(".menu-button");


// INICIO
botonesMenu[0].addEventListener("click", function() {

    mostrarSeccion("inicio");

});


// ANIMALES
botonesMenu[1].addEventListener("click", function() {

    mostrarSeccion("animales");

});


// AGREGAR ANIMAL
botonesMenu[2].addEventListener("click", function() {

    mostrarSeccion("inicio");

});


// ALERTAS
botonesMenu[3].addEventListener("click", function() {

    mostrarSeccion("inicio");

});


// DATOS
botonesMenu[4].addEventListener("click", function() {

    mostrarSeccion("inicio");

});


// ANÁLISIS IA
botonesMenu[5].addEventListener("click", function() {

    mostrarSeccion("inicio");

});


// SOBRE EL PROYECTO
botonesMenu[6].addEventListener("click", function() {

    mostrarSeccion("sobre-proyecto");

});


// ================================
// BUSCADOR DE ANIMALES
// ================================

const buscador = document.getElementById("buscador");
const listaAnimales = document.getElementById("lista-animales");


if (buscador && listaAnimales) {

    buscador.addEventListener("input", function() {

        const textoBuscado = buscador.value.toLowerCase();

        const animales =
            listaAnimales.querySelectorAll(".animal-card");


        animales.forEach(function(animal) {

            const informacion =
                animal.textContent.toLowerCase();


            if (informacion.includes(textoBuscado)) {

                animal.style.display = "block";

            } else {

                animal.style.display = "none";

            }

        });

    });

}