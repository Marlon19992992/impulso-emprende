// ==========================================
// IMPULSO EMPRENDE 2026
// Dashboard completo + Carrusel
// ==========================================

// ---------- Alumno ----------
const alumno = JSON.parse(localStorage.getItem("alumno"));

if (!alumno) {
    window.location.href = "index.html";
}

document.getElementById("saludo").textContent =
    "Bienvenido " + alumno.nombre;

document.getElementById("nombreNav").textContent = alumno.nombre;
document.getElementById("nombrePass").textContent = alumno.nombre;
document.getElementById("carreraPass").textContent = alumno.carrera;
document.getElementById("controlPass").textContent =
    "Número de Control: " + alumno.control;

const KEY = "pasaporte_" + alumno.control;

// ---------- Actividades ----------
const actividadesBase = [

{
id:1,
tipo:"ESCENARIO PRINCIPAL",
color:"#22c55e",
titulo:"Conferencia Magistral",
descripcion:"Bienvenida oficial del Festival Impulso Emprende 2026.",
hora:"11:00",
lugar:"Escenario Principal",
done:false
},

{
id:2,
tipo:"ETAPA EMPRESARIAL",
color:"#2563eb",
titulo:"Networking Empresarial",
descripcion:"Conecta con empresas y reclutadores invitados.",
hora:"12:00",
lugar:"Etapa Empresarial",
done:false
},

{
id:3,
tipo:"ETAPA DE CREACIÓN",
color:"#f59e0b",
titulo:"Design Thinking",
descripcion:"Taller de innovación y creatividad.",
hora:"13:00",
lugar:"Etapa de Creación",
done:false
},

{
id:4,
tipo:"ETAPA DE DESARROLLO",
color:"#9333ea",
titulo:"Desarrollo de Prototipos",
descripcion:"Construcción de soluciones tecnológicas.",
hora:"14:00",
lugar:"Etapa de Desarrollo",
done:false
},

{
id:5,
tipo:"ETAPA FUTURA",
color:"#06b6d4",
titulo:"Inteligencia Artificial",
descripcion:"Aplicaciones reales de IA en la industria.",
hora:"15:00",
lugar:"Etapa Futura",
done:false
},

{
id:6,
tipo:"GOOGLE CLOUD",
color:"#ea580c",
titulo:"Google Cloud Zone",
descripcion:"Servicios en la nube y herramientas de Google.",
hora:"16:00",
lugar:"Google Cloud Zone",
done:false
},

{
id:7,
tipo:"CLAUSURA",
color:"#dc2626",
titulo:"Premiación",
descripcion:"Entrega de insignias digitales y cierre del festival.",
hora:"17:00",
lugar:"Escenario Principal",
done:false
}

];

// ---------- Datos guardados ----------
let actividades =
JSON.parse(localStorage.getItem(KEY)) || actividadesBase;

let actividadActual = 0;

// ---------- Referencias ----------
const agenda = document.getElementById("listaAgenda");
const panel = document.getElementById("panel");
const tipo = document.getElementById("tipo");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const hora = document.getElementById("hora");
const lugar = document.getElementById("lugar");
const completar = document.getElementById("completar");
const barra = document.getElementById("barra");
const textoProgreso = document.getElementById("textoProgreso");
const dots = document.getElementById("dots");

// ==========================================
// CAMBIO DE PESTAÑAS
// ==========================================

const tabs = document.querySelectorAll("[data-tab]");
const vistas = document.querySelectorAll(".tab-content");

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));
vistas.forEach(v=>v.classList.remove("active"));

tab.classList.add("active");
document.getElementById(tab.dataset.tab).classList.add("active");

});

});

// ==========================================
// GUARDAR
// ==========================================

function guardar(){
localStorage.setItem(KEY,JSON.stringify(actividades));
}

// ==========================================
// INDICADORES
// ==========================================

function crearDots(){

if(!dots) return;

dots.innerHTML="";

actividades.forEach((a,i)=>{

const d=document.createElement("div");
d.className="dot";

if(i===actividadActual){
d.classList.add("activo");
}

d.onclick=()=>{
actividadActual=i;
mostrarActividad();
};

dots.appendChild(d);

});

}

// ==========================================
// MOSTRAR ACTIVIDAD
// ==========================================

function mostrarActividad(direccion = "left"){

    const a = actividades[actividadActual];

    // Animación del carrusel
       panel.classList.remove("slide-left","slide-right");
       void panel.offsetWidth;

       panel.classList.add(
       direccion === "left" ? "slide-left" : "slide-right"
    );

    tipo.textContent = a.tipo;
    tipo.style.background = a.color + "22";
    tipo.style.color = a.color;

    titulo.textContent = a.titulo;
    descripcion.textContent = a.descripcion;

    hora.textContent = "🕚 " + a.hora;
    lugar.textContent = "📍 " + a.lugar;

    completar.style.background = a.color;

    if(a.done){
        completar.disabled = true;
        completar.textContent = "Asistencia registrada ✓";
    }else{
        completar.disabled = false;
        completar.textContent = "Marcar asistencia";
    }

    crearDots();
}

// ==========================================
// PROGRESO
// ==========================================

function actualizarProgreso(){

const hechas=actividades.filter(a=>a.done).length;
const porcentaje=Math.round((hechas/7)*100);

barra.style.width=porcentaje+"%";

document.getElementById("porcentaje").textContent=
porcentaje+"%";

textoProgreso.textContent=
`${hechas} de 7 actividades completadas`;

}

// ==========================================
// AGENDA
// ==========================================

function crearAgenda(){

agenda.innerHTML="";

actividades.forEach((a,index)=>{

const card=document.createElement("div");
card.className="card-agenda";
card.style.borderLeft=`6px solid ${a.color}`;

card.innerHTML=`
<div class="agenda-top">

<span class="agenda-badge"
style="background:${a.color}">
${a.hora}
</span>

${a.done ? '<span class="agenda-check">✓</span>' : ''}

</div>

<h3>${a.titulo}</h3>

<p>${a.descripcion}</p>

<div class="agenda-info">

<span>${a.lugar}</span>

<span>Actividad ${a.id}</span>

</div>
`;

card.onclick=()=>{

actividadActual=index;
mostrarActividad();

tabs.forEach(t=>t.classList.remove("active"));
vistas.forEach(v=>v.classList.remove("active"));

document
.querySelector('[data-tab="pasaporte"]')
.classList.add("active");

document
.getElementById("pasaporte")
.classList.add("active");

};

agenda.appendChild(card);

});

}

// ==========================================
// INSIGNIAS
// ==========================================

function crearInsignias(){

const contenedor=
document.getElementById("listaInsignias");

contenedor.innerHTML="";

actividades.forEach(a=>{

const card=document.createElement("div");

card.className=
"insignia "+(a.done ? "desbloqueada":"bloqueada");

card.innerHTML=`

<div class="icono"
style="background:${a.color}">
${a.done ? "🏅":"🔒"}
</div>

<h4>Actividad ${a.id}</h4>

<p>${a.done ? "Insignia obtenida":"Pendiente"}</p>

`;

contenedor.appendChild(card);

});

}

// ==========================================
// COMPLETAR
// ==========================================

completar.onclick=()=>{

if(actividades[actividadActual].done) return;

actividades[actividadActual].done=true;

guardar();
actualizarProgreso();
crearAgenda();
crearInsignias();
mostrarActividad();

};

// ==========================================
// FLECHAS DEL CARRUSEL
// ==========================================

const next=document.getElementById("next");
const prev=document.getElementById("prev");

next.onclick = ()=>{
    actividadActual = (actividadActual + 1) % actividades.length;
    mostrarActividad("left");
};

prev.onclick = ()=>{
    actividadActual = (actividadActual - 1 + actividades.length) % actividades.length;
    mostrarActividad("right");
};

// Flechas del teclado
document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowRight" && next){
next.click();
}

if(e.key==="ArrowLeft" && prev){
prev.click();
}

});

// ==========================================
// QR
// ==========================================

const modalQR=document.getElementById("modalQR");
const qrReal=document.getElementById("qrReal");

document.getElementById("mostrarQR").onclick=()=>{

modalQR.style.display="flex";

nombreQR.textContent=alumno.nombre;

controlQR.textContent=
alumno.carrera+" · "+alumno.control;

qrReal.innerHTML="";

new QRCode(qrReal,{
text:JSON.stringify(alumno),
width:160,
height:160
});

};

function cerrarQR(){
modalQR.style.display="none";
}

modalQR.onclick=(e)=>{
if(e.target===modalQR){
cerrarQR();
}
};

// ==========================================
// SALIR
// ==========================================

document.getElementById("salir").onclick=()=>{

localStorage.removeItem("alumno");
window.location.href="index.html";

};

// ==========================================
// INICIALIZAR
// ==========================================

crearAgenda();
crearInsignias();
mostrarActividad();
actualizarProgreso();