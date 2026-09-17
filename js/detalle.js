// ======================================
// DETALLE DE LA TIERRA
// PASAPORTE DIGITAL
// ======================================

// Tierra seleccionada desde el dashboard
const id = Number(localStorage.getItem("tierra")) || 1;

// ======================================
// ESCENARIOS
// ======================================
const tierras = {
    1:{
        nombre:"Cultura",
        descripcion:"Arte, música y economía creativa.",
        color:"#16A34A",
        qr:[
            "IMPULSO2026-CUL-01","IMPULSO2026-CUL-02","IMPULSO2026-CUL-03",
            "IMPULSO2026-CUL-04","IMPULSO2026-CUL-05","IMPULSO2026-CUL-06"
        ],
        actividades:[
            ["09:00","Conferencia","Innovación Cultural"],
            ["10:30","Taller","Branding para Artistas"],
            ["12:00","Panel","Economía Creativa"],
            ["13:30","Workshop","Producción Musical"],
            ["15:00","Networking","Industrias Creativas"],
            ["16:30","Conferencia","Arte Digital"]
        ]
    },

    2:{
        nombre:"Deporte",
        descripcion:"Salud y emprendimiento deportivo.",
        color:"#EA580C",
        qr:[
            "IMPULSO2026-DEP-01","IMPULSO2026-DEP-02","IMPULSO2026-DEP-03",
            "IMPULSO2026-DEP-04","IMPULSO2026-DEP-05","IMPULSO2026-DEP-06"
        ],
        actividades:[
            ["09:00","Conferencia","Marketing Fitness"],
            ["10:30","Taller","Nutrición Deportiva"],
            ["12:00","Workshop","Entrenamiento Inteligente"],
            ["13:30","Panel","Deporte Universitario"],
            ["15:00","Networking","Clubes Deportivos"],
            ["16:30","Conferencia","Tecnología en el Deporte"]
        ]
    },

    3:{
        nombre:"Tecnología",
        descripcion:"IA, software y ciberseguridad.",
        color:"#2563EB",
        qr:[
            "IMPULSO2026-TEC-01","IMPULSO2026-TEC-02","IMPULSO2026-TEC-03",
            "IMPULSO2026-TEC-04","IMPULSO2026-TEC-05","IMPULSO2026-TEC-06"
        ],
        actividades:[
            ["09:00","Magistral","Inteligencia Artificial"],
            ["10:30","Taller","Flutter desde Cero"],
            ["12:00","Workshop","Desarrollo Web"],
            ["13:30","Panel","Ciberseguridad"],
            ["15:00","Laboratorio","IoT y Sensores"],
            ["16:30","Conferencia","Cloud Computing"]
        ]
    },

    4:{
        nombre:"Diseño",
        descripcion:"UX/UI y creatividad.",
        color:"#7C3AED",
        qr:[
            "IMPULSO2026-DIS-01","IMPULSO2026-DIS-02","IMPULSO2026-DIS-03",
            "IMPULSO2026-DIS-04","IMPULSO2026-DIS-05","IMPULSO2026-DIS-06"
        ],
        actividades:[
            ["09:00","Workshop","UX para Startups"],
            ["10:30","Taller","Diseño con IA"],
            ["12:00","Masterclass","Figma Pro"],
            ["13:30","Panel","Arquitectura"],
            ["15:00","Workshop","Motion Graphics"],
            ["16:30","Conferencia","Diseño Inclusivo"]
        ]
    },

    5:{
        nombre:"Investigación",
        descripcion:"Ciencia e innovación aplicada.",
        color:"#0D9488",
        qr:[
            "IMPULSO2026-INV-01","IMPULSO2026-INV-02","IMPULSO2026-INV-03",
            "IMPULSO2026-INV-04","IMPULSO2026-INV-05","IMPULSO2026-INV-06"
        ],
        actividades:[
            ["09:00","Coloquio","Patentes"],
            ["10:30","Panel","Investigación Aplicada"],
            ["12:00","Workshop","Redacción Científica"],
            ["13:30","Seminario","Innovación"],
            ["15:00","Networking","Investigadores"],
            ["16:30","Conferencia","Transferencia Tecnológica"]
        ]
    },

    6:{
        nombre:"Gobernanza",
        descripcion:"Derecho y transparencia.",
        color:"#64748B",
        qr:[
            "IMPULSO2026-GOB-01","IMPULSO2026-GOB-02","IMPULSO2026-GOB-03",
            "IMPULSO2026-GOB-04","IMPULSO2026-GOB-05","IMPULSO2026-GOB-06"
        ],
        actividades:[
            ["09:00","Conferencia","Protección de Datos"],
            ["10:30","Panel","Derecho Digital"],
            ["12:00","Workshop","Gobierno Abierto"],
            ["13:30","Mesa","Transparencia"],
            ["15:00","Taller","Fiscal Digital"],
            ["16:30","Conferencia","Ética Tecnológica"]
        ]
    },

    7:{
        nombre:"Bienestar",
        descripcion:"Salud, turismo y gastronomía.",
        color:"#15803D",
        qr:[
            "IMPULSO2026-BIE-01","IMPULSO2026-BIE-02","IMPULSO2026-BIE-03",
            "IMPULSO2026-BIE-04","IMPULSO2026-BIE-05","IMPULSO2026-BIE-06"
        ],
        actividades:[
            ["09:00","Taller","Salud Integral"],
            ["10:30","Experiencia","Gastronomía"],
            ["12:00","Workshop","Turismo Inteligente"],
            ["13:30","Panel","Bienestar Emocional"],
            ["15:00","Networking","Emprendedores"],
            ["16:30","Conferencia","Calidad de Vida"]
        ]
    }
};
const tierra = tierras[id];

// ======================================
// CABECERA
// ======================================
document.getElementById("nombreTierra").textContent = tierra.nombre;
document.getElementById("tituloTierra").textContent = "Tierra " + tierra.nombre;
document.getElementById("descripcionTierra").textContent = tierra.descripcion;

// PREVISTAS DE EVIDENCIA
function mostrarVistaPrevia(inputId, previewId){
    document.getElementById(inputId).addEventListener("change", e => {
        const file = e.target.files[0];
        if(!file) return;

        const imagen = document.getElementById(previewId);
        imagen.src = URL.createObjectURL(file);
        imagen.style.display = "block";
    });
}

mostrarVistaPrevia("foto1", "preview1");
mostrarVistaPrevia("foto2", "preview2");

async function guardarEvidencias(){

    const foto = document.getElementById("foto1").files[0];
    const foto2 = document.getElementById("foto2").files[0];

    if(!foto || !foto2){
        alert("Debes tomar una fotografía.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Buscar usuario
    const { data: usuarioDB, error } = await supabase
        .from("usuarios")
        .select("id")
        .eq("correo", usuario.correo)
        .single();

    if(error || !usuarioDB){
        alert("Usuario no encontrado.");
        return;
    }

    // Registrar asistencia
    const { error: asistenciaError } = await supabase
        .from("asistencias")
        .upsert({
            usuario: usuarioDB.id,
            actividad: localStorage.getItem("actividadID")
        },{
            onConflict:"usuario,actividad"
        });

    if(asistenciaError){
        const mensaje = asistenciaError.code === "42501"
            ? "Supabase bloqueó el registro de asistencia por sus políticas de seguridad."
            : "Error al registrar la asistencia.";
        alert(mensaje);
        console.error(asistenciaError);
        return;
    }

    document.getElementById("fotoModal").style.display = "none";

    const estado = document.getElementById(`estado${actividadActual}`);
    const boton  = document.getElementById(`btn${actividadActual}`);

    estado.textContent = "Completada";
    estado.style.color = "#22C55E";

    boton.textContent = "✓ Completada";
    boton.disabled = true;

    actividadesCompletadas = Math.min(6, actividadesCompletadas + 1);
    localStorage.setItem(`progreso_${id}`, actividadesCompletadas);

    actualizarContador();

    alert("Asistencia registrada correctamente.");

}
// ======================================
// CONTADOR
// ======================================
let actividadesCompletadas = Number(localStorage.getItem(`progreso_${id}`)) || 0;

const contador = document.getElementById("contador");
const badge = document.getElementById("badgeEstado");

actualizarContador();

// ======================================
// CREAR ACTIVIDADES
// ======================================
const lista = document.getElementById("listaActividades");

tierra.actividades.forEach((act, i) => {

    const hecha = i < actividadesCompletadas;

    lista.innerHTML += `
        <div class="actividad-card">

            <div class="actividad-info">

                <div class="hora">${act[0]}</div>

                <span class="tipo">${act[1]}</span>

                <h3>${act[2]}</h3>

                <p class="estado" id="estado${i}"
                   style="color:${hecha ? "#22C55E" : "#94A3B8"}">

                    ${hecha ? "Completada" : "Pendiente"}

                </p>

            </div>

            <button class="btn-qr"
                id="btn${i}"
                onclick="escanearQR(${i})"
                ${hecha ? "disabled" : ""}>

                ${hecha ? "✓ Completada" : "Escanear QR"}

            </button>

        </div>
    `;
});

// ======================================
// QR
// ======================================
let scanner = null;
let actividadActual = null;

function escanearQR(indice){

    actividadActual = indice;

    document.getElementById("qrModal").style.display = "flex";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },
        {
            fps:10,
            qrbox:{ width:250, height:250 }
        },
        qrExitoso
    ).catch(error=>{

        alert("No fue posible abrir la cámara.");

        console.error(error);

        cerrarQR();

    });

}

async function qrExitoso(decodedText){

    // Buscar el QR en Supabase
    const { data: actividad, error } = await supabase
        .from("actividades")
        .select("*")
        .eq("qr", decodedText)
        .single();

    if(error || !actividad){
        alert("QR inválido.");
        return;
    }

    // Verificar que pertenece al escenario actual
    if(actividad.escenario !== id){
        alert("Este QR pertenece a otra Tierra.");
        return;
    }

    // Verificar que sea la actividad correcta
    if(actividad.numero !== actividadActual + 1){
        alert("Escaneaste el QR de otra actividad.");
        return;
    }

    await scanner.stop();
    cerrarQR();

    // Guardamos temporalmente la actividad
    localStorage.setItem("actividadID", actividad.id);

    // Abrir cámara de evidencias
    document.getElementById("fotoModal").style.display = "flex";

}

function cerrarQR(){

    document.getElementById("qrModal").style.display = "none";

    if(scanner){

        scanner.stop().catch(()=>{});

        scanner = null;

    }

}

// ======================================
// PROGRESO
// ======================================
function actualizarContador(){

    contador.textContent =
        `${actividadesCompletadas} / 6 actividades`;

    if(actividadesCompletadas === 6){

        badge.textContent = "🏆";

        localStorage.setItem(`insignia_${id}`, "true");

    }else{

        badge.textContent = "🏅";

    }

}
