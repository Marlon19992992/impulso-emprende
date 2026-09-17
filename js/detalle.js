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

function qrExitoso(decodedText){

    scanner.stop().then(()=>{

        cerrarQR();

        const estado = document.getElementById(`estado${actividadActual}`);
        const boton  = document.getElementById(`btn${actividadActual}`);

        if(estado.textContent === "Completada") return;

        estado.textContent = "Completada";
        estado.style.color = "#22C55E";

        boton.textContent = "✓ Completada";
        boton.disabled = true;

        actividadesCompletadas++;

        localStorage.setItem(
            `progreso_${id}`,
            actividadesCompletadas
        );

        actualizarContador();

        // Próximo sprint
        alert("QR correcto. Ahora se abrirá la cámara para tomar las 2 fotografías.");

    });

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