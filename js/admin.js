// =======================================
// IMPULSO EMPRENDE 2026
// LOGIN ADMINISTRADOR
// =======================================

// Si ya inició sesión entra directo al panel
if (localStorage.getItem("admin") === "true") {
    window.location.href = "panel.html";
}

const formulario = document.getElementById("loginAdmin");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credenciales temporales
    if (usuario === "admin" && password === "uaemex2026") {

        localStorage.setItem("admin", "true");

        mensaje.style.color = "#22c55e";
        mensaje.textContent = "Acceso correcto...";

        setTimeout(() => {
            window.location.href = "panel.html";
        }, 500);

    } else {

        mensaje.style.color = "#ef4444";
        mensaje.textContent = "Usuario o contraseña incorrectos";

        document.getElementById("password").value = "";
        document.getElementById("password").focus();

    }

});