function detectarTipoCorreo(correo){

    correo = correo.toLowerCase().trim();

    if(correo.endsWith("@alumno.uaemex.mx")) return "alumno";
    if(correo.endsWith("@uaemex.mx")) return "maestro";

    return null;
}

function registrarUsuario(){

    const nombre = document.getElementById("nombre").value.trim();
    const control = document.getElementById("control").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const carrera = document.getElementById("carrera").value;

    if(!nombre || !control || !correo || !carrera){
        alert("Completa todos los campos.");
        return;
    }

    const tipo = detectarTipoCorreo(correo);

    if(!tipo){
        alert("Ingresa un correo institucional UAEMéx.");
        return;
    }

    const usuario = {
        nombre,
        control,
        correo,
        carrera,
        tipo
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.location.href = "dashboard.html";
}