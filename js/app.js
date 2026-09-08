// =======================================
// IMPULSO EMPRENDE 2026
// REGISTRO
// =======================================

const formulario = document.getElementById("registroForm");
const adminBtn = document.getElementById("adminBtn");

// Ir al login del administrador
adminBtn.addEventListener("click", () => {
    window.location.href = "admin.html";
});

// Registro del alumno
formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const alumno = {
        nombre: document.getElementById("nombre").value.trim(),
        control: document.getElementById("control").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        carrera: document.getElementById("carrera").value
    };

    // Guardar sesión del alumno
    localStorage.setItem("alumno", JSON.stringify(alumno));

    // Guardar lista de alumnos para el administrador
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    const existe = alumnos.find(a => a.control === alumno.control);

    if (!existe) {
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
    }

    // Entrar al dashboard
    window.location.href = "dashboard.html";

});