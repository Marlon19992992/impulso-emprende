// =======================================
// IMPULSO UAEMÉX 365
// Dashboard
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    const alumno = JSON.parse(localStorage.getItem("alumno"));

    if (!alumno) {
        window.location.href = "index.html";
        return;
    }

    // Saludo
    document.getElementById("saludo").textContent =
        "Bienvenido " + alumno.nombre;

    // Pasaporte
    document.getElementById("nombrePass").textContent =
        "Alumno: " + alumno.nombre;

    document.getElementById("carreraPass").textContent =
        "Carrera: " + alumno.carrera;

    document.getElementById("cuentaPass").textContent =
        "Número de cuenta: " + alumno.control;

    // Navegación superior
    const botones = document.querySelectorAll(".nav-link");
    const paneles = document.querySelectorAll(".tab-content");

    botones.forEach((boton)=>{
        boton.addEventListener("click",()=>{
            botones.forEach(b=>b.classList.remove("active"));
            paneles.forEach(p=>p.classList.remove("active"));

            boton.classList.add("active");
            document.getElementById(boton.dataset.tab).classList.add("active");
       });
   });

});

// Abrir Tierra
function abrirTierra(id){

    localStorage.setItem("tierra", id);

    window.location.href = "detalle.html";

}