// ======================================
// DASHBOARD - PASAPORTE DIGITAL
// ======================================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
}

document.getElementById("nombreUsuario").textContent = usuario.nombre;
document.getElementById("tipoUsuario").textContent =
    usuario.tipo === "alumno"
        ? "ALUMNO UAEMÉX"
        : "DOCENTE UAEMÉX";

const tierras = [
    {id:1,nombre:"Cultura",progreso:0,color:"#16A34A"},
    {id:2,nombre:"Deporte",progreso:0,color:"#EA580C"},
    {id:3,nombre:"Tecnología",progreso:0,color:"#2563EB"},
    {id:4,nombre:"Diseño",progreso:0,color:"#7C3AED"},
    {id:5,nombre:"Investigación",progreso:0,color:"#0D9488"},
    {id:6,nombre:"Gobernanza",progreso:0,color:"#64748B"},
    {id:7,nombre:"Bienestar",progreso:0,color:"#15803D"}
];

const grid = document.getElementById("gridTierras");
const contador = document.getElementById("contadorInsignias");

let obtenidas = 0;

tierras.forEach(tierra => {

    if (tierra.progreso === 6) obtenidas++;

    const porcentaje = (tierra.progreso / 6) * 100;

    grid.innerHTML += `
        <div class="tierra-card" onclick="abrirTierra(${tierra.id})">

            <div class="cabecera-tierra">

                <div class="icono-tierra" style="background:${tierra.color}">
                    ${tierra.id}
                </div>

                <div>
                    <small>TIERRA ${tierra.id}</small>
                    <h3>${tierra.nombre}</h3>
                </div>

            </div>

            <p>${tierra.progreso} de 6 actividades</p>

            <div class="barra">
                <div style="width:${porcentaje}%"></div>
            </div>

            <div class="footer-tierra">
                <span>En progreso</span>
                <span>🏅 Insignia</span>
            </div>

        </div>
    `;

});

contador.textContent = obtenidas;

function abrirTierra(id){
    localStorage.setItem("tierra", id);
    window.location.href = "detalle.html";
}