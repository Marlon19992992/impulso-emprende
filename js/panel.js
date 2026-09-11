// ======================================
// PANEL ADMINISTRADOR
// ======================================

// Verificar sesión
if (localStorage.getItem("admin") !== "true") {
    window.location.href = "admin.html";
}

// Alumnos registrados
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Referencias
const tabla = document.getElementById("tablaAlumnos");
const buscar = document.getElementById("buscar");
const cerrar = document.getElementById("cerrarAdmin");

// Mostrar alumnos
function cargar(lista) {

    tabla.innerHTML = "";

    if (lista.length === 0) {

        tabla.innerHTML = `
            <div class="alumno-card">
                <div class="alumno-info">
                    <h3>No hay alumnos registrados</h3>
                    <p>Registra alumnos desde la página principal.</p>
                </div>
            </div>
        `;
        return;
    }
    function actualizarEstadisticas(){

    document.getElementById("totalAlumnos").textContent =
        alumnos.length;

    let asistencias = 0;

    alumnos.forEach(alumno=>{

        const progreso = JSON.parse(
            localStorage.getItem("pasaporte_"+alumno.control)
        ) || [];

        asistencias += progreso.filter(a=>a.done).length;

    });

    document.getElementById("totalAsistencias").textContent =
        asistencias;

    document.getElementById("totalInsignias").textContent =
        asistencias;

}

    lista.forEach((a) => {

        const card = document.createElement("div");
        card.className = "alumno-card";

        card.innerHTML = `
            <div class="alumno-info">
                <h3>${a.nombre}</h3>
                <p><strong>Control:</strong> ${a.control}</p>
                <p>${a.carrera}</p>
            </div>

            <button class="ver-btn">Ver</button>
        `;

        // Abrir ficha del alumno
        card.querySelector(".ver-btn").addEventListener("click", () => {

            localStorage.setItem(
                "alumnoSeleccionado",
                JSON.stringify(a)
            );

            window.location.href = "detalle.html";

        });

        tabla.appendChild(card);

    });

}

// Buscador
buscar.addEventListener("input", () => {

    const texto = buscar.value.toLowerCase();

    const filtrados = alumnos.filter((a) => {

        return (
            a.nombre.toLowerCase().includes(texto) ||
            a.control.includes(texto)
        );

    });

    cargar(filtrados);

});

// Cerrar sesión
cerrar.addEventListener("click", () => {

    localStorage.removeItem("admin");
    window.location.href = "admin.html";

});

// Inicializar
actualizarEstadisticas();
cargar(alumnos);