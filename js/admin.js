// =======================================
// IMPULSO EMPRENDE 2026
// LOGIN ADMINISTRADOR
// =======================================

// Si ya inició sesión entra directo al panel
if(localStorage.getItem("admin") === "true"){
    window.location.href = "panel.html";
}

const formulario = document.getElementById("adminForm");
const volver = document.getElementById("volver");

// Volver al registro
volver.addEventListener("click", ()=>{
    window.location.href = "index.html";
});

// Login
formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credenciales temporales
    if(usuario === "admin" && password === "uaemex2026"){

        localStorage.setItem("admin","true");

        window.location.href = "panel.html";

    }else{

        alert("Usuario o contraseña incorrectos");

    }

});