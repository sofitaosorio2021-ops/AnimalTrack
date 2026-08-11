// ==========================================
// DATOS DE LOS ANIMALES
// ==========================================

let animales = JSON.parse(localStorage.getItem("animalTrackAnimales")) || [

    {
        chip: "001",
        edad: "3 años",
        peso: 420,
        raza: "Angus",
        origen: "",
        vacunas: "",
        notas: "",
        pesos: [
            {
                fecha: "10/08/2026",
                peso: 420
            }
        ]
    },

    {
        chip: "002",
        edad: "5 años",
        peso: 510,
        raza: "Hereford",
        origen: "",
        vacunas: "",
        notas: "",
        pesos: [
            {
                fecha: "10/08/2026",
                peso: 510
            }
        ]
    },

    {
        chip: "003",
        edad: "2 años",
        peso: 385,
        raza: "Holando",
        origen: "",
        vacunas: "",
        notas: "",
        pesos: [
            {
                fecha: "10/08/2026",
                peso: 385
            }
        ]
    }

];


// ==========================================
// GUARDAR DATOS
// ==========================================

function guardarDatos() {

    localStorage.setItem(
        "animalTrackAnimales",
        JSON.stringify(animales)
    );

}


// ==========================================
// CAMBIAR DE SECCIÓN
// ==========================================

function mostrarSeccion(seccion) {

    const secciones =
        document.querySelectorAll(".page-section");

    secciones.forEach(function(elemento) {

        elemento.style.display = "none";

    });


    const seleccionada =
        document.getElementById(seccion);

    if (seleccionada) {

        seleccionada.style.display = "block";

    }


    actualizarMenu(seccion);


    if (seccion === "animales") {

        mostrarAnimales();

    }


    if (seccion === "alertas") {

        mostrarAlertas();

    }


    if (seccion === "datos") {

        mostrarDatos();

    }

}


// ==========================================
// ACTUALIZAR MENÚ
// ==========================================

function actualizarMenu(seccion) {

    const botones =
        document.querySelectorAll(".menu-button");

    botones.forEach(function(boton) {

        boton.classList.remove("active");

    });


    const nombres = [
        "inicio",
        "animales",
        "agregar",
        "alertas",
        "datos",
        "ia",
        "sobre"
    ];


    const posicion =
        nombres.indexOf(seccion);


    if (posicion >= 0 && botones[posicion]) {

        botones[posicion].classList.add("active");

    }

}


// ==========================================
// MOSTRAR ANIMALES
// ==========================================

function mostrarAnimales() {

    const lista =
        document.getElementById("lista-animales");

    if (!lista) return;


    lista.innerHTML = "";


    animales.forEach(function(animal) {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "animal-card";


        tarjeta.innerHTML = `

            <h2>
                🐄 Chip Nº ${animal.chip}
            </h2>

            <p>
                <strong>Edad:</strong>
                ${animal.edad || "No registrada"}
            </p>

            <p>
                <strong>Peso:</strong>
                ${animal.peso} kg
            </p>

            <p>
                <strong>Raza:</strong>
                ${animal.raza || "No registrada"}
            </p>

            <button onclick="verPerfil('${animal.chip}')">
                Ver perfil
            </button>

        `;


        lista.appendChild(tarjeta);

    });

}


// ==========================================
// BUSCADOR
// ==========================================

const buscador =
    document.getElementById("buscador");


if (buscador) {

    buscador.addEventListener(
        "input",
        function() {

            const texto =
                buscador.value.toLowerCase();


            const tarjetas =
                document.querySelectorAll(".animal-card");


            tarjetas.forEach(function(tarjeta) {

                const informacion =
                    tarjeta.textContent.toLowerCase();


                if (informacion.includes(texto)) {

                    tarjeta.style.display = "block";

                } else {

                    tarjeta.style.display = "none";

                }

            });

        }
    );

}


// ==========================================
// VER PERFIL
// ==========================================

function verPerfil(chip) {

    const animal =
        animales.find(function(a) {

            return a.chip === chip;

        });


    if (!animal) {

        alert("No se encontró ese animal.");

        return;

    }


    const perfil =
        document.getElementById("contenido-perfil");


    perfil.innerHTML = `

        <section class="welcome">

            <h1>
                🐄 Animal - Chip Nº ${animal.chip}
            </h1>

            <p>
                Información individual del animal.
            </p>

        </section>


        <div class="info-box">

            <h2>
                Información del animal
            </h2>

            <p>
                <strong>Chip:</strong>
                ${animal.chip}
            </p>

            <p>
                <strong>Edad:</strong>
                ${animal.edad || "No registrada"}
            </p>

            <p>
                <strong>Raza:</strong>
                ${animal.raza || "No registrada"}
            </p>

            <p>
                <strong>Origen:</strong>
                ${animal.origen || "No registrado"}
            </p>

            <p>
                <strong>Vacunas:</strong>
                ${animal.vacunas || "No registradas"}
            </p>

        </div>


        <div class="info-box">

            <h2>
                ⚖️ Peso actual
            </h2>

            <p>
                Peso registrado actualmente:
                <strong>${animal.peso} kg</strong>
            </p>

            <label>
                Actualizar peso:
            </label>

            <input
                type="number"
                id="nuevo-peso-perfil"
                value="${animal.peso}"
                min="0"
                step="0.1"
            >

            <button onclick="actualizarPeso('${animal.chip}')">
                💾 Guardar nuevo peso
            </button>

        </div>


        <div class="info-box">

            <h2>
                📈 Evolución del peso
            </h2>

            <div id="evolucion-peso">

                ${generarEvolucion(animal)}

            </div>

        </div>


        <div class="info-box">

            <h2>
                📊 Estadísticas mensuales
            </h2>

            <p>
                Evolución del peso organizada por mes.
            </p>

            <div id="estadisticas-mensuales">

                ${generarEstadisticasMensuales(animal)}

            </div>

        </div>


        <div class="info-box">

            <h2>
                📈 Gráfico de evolución
            </h2>

            <div id="grafico-peso">

                ${generarGrafico(animal)}

            </div>

        </div>


        <div class="info-box">

            <h2>
                📝 Notas
            </h2>

            <textarea
                id="nota-animal"
                placeholder="Escribí una nota sobre este animal..."
            ></textarea>

            <button onclick="agregarNota('${animal.chip}')">
                ➕ Agregar nota
            </button>

            <div id="notas-animal">

                ${mostrarNotas(animal)}

            </div>

        </div>


        <div class="info-box">

            <h2>
                ⚠️ Estado del animal
            </h2>

            <p>
                ${analizarAnimal(animal)}
            </p>

        </div>


        <div class="info-box">

            <h2>
                🗑️ Gestión del animal
            </h2>

            <p>
                Si el animal ya no pertenece al establecimiento,
                podés eliminarlo del sistema.
            </p>

            <button
                onclick="eliminarAnimal('${animal.chip}')"
            >
                🗑️ Eliminar animal
            </button>

        </div>


        <button onclick="mostrarSeccion('animales')">
            ← Volver a animales
        </button>

    `;


    mostrarSeccion("perfil-animal");

}


// ==========================================
// ACTUALIZAR PESO
// ==========================================

function actualizarPeso(chip) {

    const animal =
        animales.find(function(a) {

            return a.chip === chip;

        });


    if (!animal) {

        alert("No se encontró el animal.");

        return;

    }


    const campo =
        document.getElementById(
            "nuevo-peso-perfil"
        );


    const nuevoPeso =
        Number(campo.value);


    if (!nuevoPeso || nuevoPeso <= 0) {

        alert("Ingresá un peso válido.");

        return;

    }


    animal.peso = nuevoPeso;


    if (!animal.pesos) {

        animal.pesos = [];

    }


    const fecha =
        new Date();


    const fechaTexto =
        String(fecha.getDate()).padStart(2, "0") +
        "/" +
        String(fecha.getMonth() + 1).padStart(2, "0") +
        "/" +
        fecha.getFullYear();


    animal.pesos.push({

        fecha: fechaTexto,

        peso: nuevoPeso

    });


    guardarDatos();


    alert("Peso actualizado correctamente.");


    verPerfil(chip);

}


// ==========================================
// EVOLUCIÓN DEL PESO
// ==========================================

function generarEvolucion(animal) {

    if (!animal.pesos ||
        animal.pesos.length === 0) {

        return `
            <p>
                No hay mediciones registradas.
            </p>
        `;

    }


    let html = "";


    animal.pesos.forEach(
        function(medicion, indice) {

            let cambio = "";


            if (indice > 0) {

                const anterior =
                    animal.pesos[indice - 1].peso;


                const diferencia =
                    medicion.peso - anterior;


                if (diferencia > 0) {

                    cambio =
                        ` ↑ +${diferencia.toFixed(1)} kg`;

                }

                else if (diferencia < 0) {

                    cambio =
                        ` ↓ ${diferencia.toFixed(1)} kg`;

                }

                else {

                    cambio =
                        " → Sin cambios";

                }

            }


            html += `

                <p>

                    <strong>
                        ${medicion.fecha}:
                    </strong>

                    ${medicion.peso} kg

                    ${cambio}

                </p>

            `;

        }
    );


    return html;

}


// ==========================================
// ESTADÍSTICAS MENSUALES
// ==========================================

function generarEstadisticasMensuales(animal) {

    if (!animal.pesos ||
        animal.pesos.length < 2) {

        return `
            <p>
                Se necesitan al menos dos mediciones
                para generar estadísticas.
            </p>
        `;

    }


    const meses = {};


    animal.pesos.forEach(function(medicion) {

        if (!medicion.fecha ||
            medicion.fecha === "Registro inicial") {

            return;

        }


        const partes =
            medicion.fecha.split("/");


        if (partes.length !== 3) return;


        const dia = partes[0];

        const mes = partes[1];

        const año = partes[2];


        const clave =
            `${año}-${mes}`;


        const nombreMes =
            obtenerNombreMes(Number(mes));


        if (!meses[clave]) {

            meses[clave] = {

                nombre:
                    `${nombreMes} ${año}`,

                pesos: []

            };

        }


        meses[clave].pesos.push(
            Number(medicion.peso)
        );

    });


    const claves =
        Object.keys(meses).sort();


    if (claves.length === 0) {

        return `
            <p>
                Todavía no hay suficientes datos
                para organizar estadísticas mensuales.
            </p>
        `;

    }


    let html = "";


    claves.forEach(function(clave) {

        const datos =
            meses[clave].pesos;


        const promedio =
            datos.reduce(
                function(total, peso) {

                    return total + peso;

                },
                0
            ) / datos.length;


        const minimo =
            Math.min(...datos);


        const maximo =
            Math.max(...datos);


        const primero =
            datos[0];


        const ultimo =
            datos[datos.length - 1];


        const diferencia =
            ultimo - primero;


        let evolucion;


        if (diferencia > 0) {

            evolucion =
                `📈 +${diferencia.toFixed(1)} kg`;

        }

        else if (diferencia < 0) {

            evolucion =
                `📉 ${diferencia.toFixed(1)} kg`;

        }

        else {

            evolucion =
                "➡️ Sin cambios";

        }


        html += `

            <div
                class="info-box"
                style="margin-top: 15px;"
            >

                <h3>
                    📅 ${meses[clave].nombre}
                </h3>

                <p>
                    <strong>
                        Mediciones:
                    </strong>
                    ${datos.length}
                </p>

                <p>
                    <strong>
                        Peso promedio:
                    </strong>
                    ${promedio.toFixed(1)} kg
                </p>

                <p>
                    <strong>
                        Peso mínimo:
                    </strong>
                    ${minimo.toFixed(1)} kg
                </p>

                <p>
                    <strong>
                        Peso máximo:
                    </strong>
                    ${maximo.toFixed(1)} kg
                </p>

                <p>
                    <strong>
                        Evolución:
                    </strong>
                    ${evolucion}
                </p>

            </div>

        `;

    });


    return html;

}


// ==========================================
// NOMBRE DEL MES
// ==========================================

function obtenerNombreMes(numero) {

    const meses = [

        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"

    ];


    return meses[numero - 1] || "";

}


// ==========================================
// GRÁFICO VISUAL
// ==========================================

function generarGrafico(animal) {

    if (!animal.pesos ||
        animal.pesos.length < 2) {

        return `
            <p>
                Se necesitan al menos dos mediciones
                para generar el gráfico.
            </p>
        `;

    }


    const pesos =
        animal.pesos.map(
            function(medicion) {

                return Number(medicion.peso);

            }
        );


    const minimo =
        Math.min(...pesos);


    const maximo =
        Math.max(...pesos);


    const diferencia =
        maximo - minimo;


    let escala = diferencia;


    if (escala === 0) {

        escala = 1;

    }


    let html = `

        <div
            style="
                overflow-x:auto;
                padding:15px;
            "
        >

            <div
                style="
                    min-width:500px;
                    position:relative;
                "
            >

                <div
                    style="
                        display:flex;
                        align-items:flex-end;
                        gap:12px;
                        height:250px;
                        border-left:2px solid #555;
                        border-bottom:2px solid #555;
                        padding:10px;
                    "
                >

    `;


    animal.pesos.forEach(
        function(medicion) {

            const porcentaje =
                20 +
                (
                    (
                        Number(medicion.peso) -
                        minimo
                    ) / escala
                ) * 70;


            html += `

                <div
                    style="
                        height:${porcentaje}%;
                        min-height:30px;
                        flex:1;
                        display:flex;
                        flex-direction:column;
                        justify-content:flex-start;
                        align-items:center;
                    "
                >

                    <strong>
                        ${medicion.peso} kg
                    </strong>

                    <div
                        style="
                            width:100%;
                            height:100%;
                            background:#6fa86f;
                            margin-top:5px;
                            border-radius:5px 5px 0 0;
                        "
                    ></div>

                    <small
                        style="
                            margin-top:5px;
                            white-space:nowrap;
                        "
                    >
                        ${medicion.fecha}
                    </small>

                </div>

            `;

        }
    );


    html += `

                </div>

            </div>

        </div>

    `;


    return html;

}


// ==========================================
// ANALIZAR ANIMAL
// ==========================================

function analizarAnimal(animal) {

    if (!animal.pesos ||
        animal.pesos.length < 2) {

        return `

            Todavía no hay suficientes mediciones
            para realizar una evaluación de evolución
            del peso.

        `;

    }


    const ultima =
        animal.pesos[
            animal.pesos.length - 1
        ].peso;


    const anterior =
        animal.pesos[
            animal.pesos.length - 2
        ].peso;


    const porcentaje =
        ((ultima - anterior) / anterior) * 100;


    if (porcentaje <= -15) {

        return `

            🚨 <strong>
                Alerta importante:
            </strong>

            se detectó una disminución aproximada
            del ${Math.abs(porcentaje).toFixed(1)}%
            respecto de la medición anterior.

            <br><br>

            Este cambio requiere atención y debería
            ser evaluado por un especialista veterinario.

        `;

    }


    if (porcentaje <= -7) {

        return `

            ⚠️ <strong>
                Posible anomalía:
            </strong>

            se detectó una disminución aproximada
            del ${Math.abs(porcentaje).toFixed(1)}%.

            <br><br>

            Se recomienda continuar controlando
            al animal.

        `;

    }


    if (porcentaje < 0) {

        return `

            📉 El animal presentó una disminución
            de peso respecto de la última medición.

            <br><br>

            Conviene continuar registrando mediciones
            para determinar si se trata de una variación
            temporal o sostenida.

        `;

    }


    if (porcentaje > 0) {

        return `

            📈 El animal presentó un aumento aproximado
            del ${porcentaje.toFixed(1)}% respecto de la
            medición anterior.

            <br><br>

            El aumento de peso no genera una alerta.

        `;

    }


    return `

        ➡️ No se detectaron cambios de peso entre
        las últimas mediciones.

    `;

}


// ==========================================
// AGREGAR NOTA
// ==========================================

function agregarNota(chip) {

    const animal =
        animales.find(function(a) {

            return a.chip === chip;

        });


    if (!animal) return;


    const campo =
        document.getElementById(
            "nota-animal"
        );


    const nota =
        campo.value.trim();


    if (nota === "") {

        alert(
            "Escribí una nota antes de guardarla."
        );

        return;

    }


    if (!animal.notas) {

        animal.notas = "";

    }


    const fecha =
        new Date();


    const fechaTexto =
        String(fecha.getDate()).padStart(2, "0") +
        "/" +
        String(fecha.getMonth() + 1).padStart(2, "0") +
        "/" +
        fecha.getFullYear();


    animal.notas +=
        `\n${fechaTexto}: ${nota}`;


    guardarDatos();


    verPerfil(chip);

}


// ==========================================
// MOSTRAR NOTAS
// ==========================================

function mostrarNotas(animal) {

    if (!animal.notas) {

        return `

            <p>
                No hay notas registradas.
            </p>

        `;

    }


    return `

        <p style="white-space: pre-line;">
            ${animal.notas}
        </p>

    `;

}


// ==========================================
// AGREGAR ANIMAL
// ==========================================

function agregarAnimal() {

    const chip =
        document.getElementById(
            "nuevo-chip"
        ).value.trim();


    const peso =
        Number(
            document.getElementById(
                "nuevo-peso"
            ).value
        );


    const edad =
        document.getElementById(
            "nuevo-edad"
        ).value.trim();


    const raza =
        document.getElementById(
            "nuevo-raza"
        ).value.trim();


    const origen =
        document.getElementById(
            "nuevo-origen"
        ).value.trim();


    const vacunas =
        document.getElementById(
            "nuevo-vacunas"
        ).value.trim();


    if (chip === "" || !peso) {

        alert(
            "El número de chip y el peso son obligatorios."
        );

        return;

    }


    const existente =
        animales.find(function(a) {

            return a.chip === chip;

        });


    if (existente) {

        alert(
            "Ya existe un animal con ese número de chip."
        );

        return;

    }


    const fecha =
        new Date();


    const fechaTexto =
        String(fecha.getDate()).padStart(2, "0") +
        "/" +
        String(fecha.getMonth() + 1).padStart(2, "0") +
        "/" +
        fecha.getFullYear();


    animales.push({

        chip: chip,

        edad: edad,

        peso: peso,

        raza: raza,

        origen: origen,

        vacunas: vacunas,

        notas: "",

        pesos: [

            {
                fecha: fechaTexto,

                peso: peso
            }

        ]

    });


    guardarDatos();


    document.getElementById(
        "nuevo-chip"
    ).value = "";


    document.getElementById(
        "nuevo-peso"
    ).value = "";


    document.getElementById(
        "nuevo-edad"
    ).value = "";


    document.getElementById(
        "nuevo-raza"
    ).value = "";


    document.getElementById(
        "nuevo-origen"
    ).value = "";


    document.getElementById(
        "nuevo-vacunas"
    ).value = "";


    alert(
        "Animal registrado correctamente."
    );


    mostrarSeccion("animales");

}


// ==========================================
// ELIMINAR ANIMAL
// ==========================================

function eliminarAnimal(chip) {

    const confirmar =
        confirm(
            `¿Seguro que querés eliminar el animal con chip Nº ${chip}?`
        );


    if (!confirmar) {

        return;

    }


    animales =
        animales.filter(
            function(animal) {

                return animal.chip !== chip;

            }
        );


    guardarDatos();


    alert(
        "Animal eliminado correctamente."
    );


    mostrarSeccion("animales");

}


// ==========================================
// ALERTAS
// ==========================================

function mostrarAlertas() {

    const contenedor =
        document.getElementById(
            "lista-alertas"
        );


    if (!contenedor) return;


    contenedor.innerHTML = "";


    let cantidadAlertas = 0;


    animales.forEach(function(animal) {

        if (!animal.pesos ||
            animal.pesos.length < 2) {

            return;

        }


        const ultima =
            animal.pesos[
                animal.pesos.length - 1
            ].peso;


        const anterior =
            animal.pesos[
                animal.pesos.length - 2
            ].peso;


        const porcentaje =
            ((ultima - anterior) /
            anterior) * 100;


        // SOLO SE GENERAN ALERTAS
        // CUANDO HAY PÉRDIDA DE PESO

        if (porcentaje <= -7) {

            cantidadAlertas++;


            const alerta =
                document.createElement(
                    "div"
                );


            alerta.className =
                "info-box";


            let nivel =
                "⚠️ Posible anomalía";


            if (porcentaje <= -15) {

                nivel =
                    "🚨 Alerta importante";

            }


            alerta.innerHTML = `

                <h2>
                    ${nivel}
                    - Chip Nº ${animal.chip}
                </h2>

                <p>

                    El animal presentó una disminución
                    aproximada del

                    <strong>
                        ${Math.abs(
                            porcentaje
                        ).toFixed(1)}%
                    </strong>

                    respecto de la medición anterior.

                </p>

                <button
                    onclick="verPerfil('${animal.chip}')"
                >
                    Ver perfil
                </button>

            `;


            contenedor.appendChild(
                alerta
            );

        }

    });


    if (cantidadAlertas === 0) {

        contenedor.innerHTML = `

            <div class="info-box">

                <h2>
                    ✅ No hay alertas
                </h2>

                <p>
                    Actualmente no se detectaron
                    pérdidas de peso que superen
                    los niveles de alerta configurados.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DATOS GENERALES
// ==========================================

function mostrarDatos() {

    const contenedor =
        document.getElementById(
            "resumen-datos"
        );


    if (!contenedor) return;


    const cantidad =
        animales.length;


    let pesoTotal = 0;


    animales.forEach(function(animal) {

        pesoTotal +=
            Number(animal.peso);

    });


    const promedio =
        cantidad > 0
            ? pesoTotal / cantidad
            : 0;


    contenedor.innerHTML = `

        <div class="info-box">

            <h2>
                📊 Resumen
            </h2>

            <p>
                <strong>
                    Animales registrados:
                </strong>

                ${cantidad}

            </p>

            <p>
                <strong>
                    Peso promedio:
                </strong>

                ${promedio.toFixed(1)} kg

            </p>

            <p>
                Los datos se actualizan cada vez
                que se registra una nueva medición.
            </p>

        </div>

    `;

}


// ==========================================
// INTELIGENCIA ARTIFICIAL
// ==========================================

function consultarIA() {

    const chip =
        document.getElementById(
            "ia-chip"
        ).value.trim();


    const pregunta =
        document.getElementById(
            "ia-pregunta"
        ).value.trim();


    const resultado =
        document.getElementById(
            "resultado-ia"
        );


    const animal =
        animales.find(function(a) {

            return a.chip === chip;

        });


    if (!animal) {

        resultado.style.display =
            "block";


        resultado.innerHTML = `

            <h2>
                🤖 Análisis
            </h2>

            <p>
                No encontré un animal con el
                chip Nº ${chip}.
            </p>

        `;

        return;

    }


    const analisis =
        analizarAnimal(animal);


    resultado.style.display =
        "block";


    resultado.innerHTML = `

        <h2>
            🤖 Análisis del Chip Nº
            ${animal.chip}
        </h2>

        <p>

            <strong>
                Peso actual:
            </strong>

            ${animal.peso} kg

        </p>

        <p>

            <strong>
                Cantidad de mediciones:
            </strong>

            ${animal.pesos
                ? animal.pesos.length
                : 0}

        </p>

        <p>

            <strong>
                Pregunta:
            </strong>

            ${pregunta ||
            "Análisis general"}

        </p>

        <hr>

        <p>
            ${analisis}
        </p>

        <p>

            El sistema puede detectar cambios
            en los registros del animal, pero una
            alteración de peso por sí sola no
            permite diagnosticar una enfermedad.

        </p>

        <p>

            Si existe una pérdida de peso importante
            o sostenida, se recomienda consultar a
            un veterinario para realizar una
            evaluación profesional.

        </p>

    `;

}


// ==========================================
// INICIO
// ==========================================

mostrarAnimales();