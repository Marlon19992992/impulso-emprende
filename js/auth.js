function detectarTipoCorreo(correo){

    correo = correo.toLowerCase().trim();

    if(correo.endsWith("@alumno.uaemex.mx")) return "alumno";
    if(correo.endsWith("@uaemex.mx")) return "docente";

    return null;
}

async function registrarUsuario(){

    const nombre = document.getElementById("nombre").value.trim();
    const control = document.getElementById("control").value.trim();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
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

    const boton = document.querySelector(".btn-registro");
    const textoOriginal = boton.textContent;

    boton.disabled = true;
    boton.textContent = "Registrando...";

    const { error } = await supabaseClient
    .from("usuarios")
    .insert([usuario]);

    if (error) {
    console.error("Supabase:", error);
    alert(`Error ${error.code}: ${error.message}`);

    boton.disabled = false;
    boton.textContent = textoOriginal;
    return;
}

    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.location.href = "dashboard.html";
}
