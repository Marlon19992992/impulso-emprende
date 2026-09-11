// ===========================
// IMPULSO UAEMÉX 365
// Dashboard
// ===========================

const alumno = JSON.parse(localStorage.getItem("alumno"));

if (!alumno) {
    window.location.href = "index.html";
}

// Saludo del alumno
document.getElementById("saludo").textContent =
    "Bienvenido, " + alumno.nombre;

// Abrir tierra temática
function abrirTierra(id) {

    localStorage.setItem("tierra", id);

    window.location.href = "detalle.html";

}