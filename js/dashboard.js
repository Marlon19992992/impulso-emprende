// ======================================
// DASHBOARD — TIERRAS Y PASAPORTE DIGITAL
// ======================================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
} else {
    iniciarDashboard();
}

function iniciarDashboard() {
    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    const tipoUsuario = document.getElementById("tipoUsuario");
    const correoInstitucional = (usuario.correo || "").toLowerCase().trim();
    const esDocente =
        usuario.tipo === "docente" ||
        usuario.tipo === "maestro" ||
        correoInstitucional.endsWith("@uaemex.mx");

    tipoUsuario.textContent = esDocente ? "DOCENTE UAEMÉX" : "ALUMNO UAEMÉX";
    tipoUsuario.classList.toggle("docente", esDocente);

    const tierras = [
        { id: 1, nombre: "Cultura", descripcion: "Arte, música, patrimonio e industrias creativas.", color: "#16A34A", icono: "🎭" },
        { id: 2, nombre: "Deporte", descripcion: "Actividad física, salud y emprendimiento deportivo.", color: "#EA580C", icono: "🏃" },
        { id: 3, nombre: "Tecnología", descripcion: "Innovación, software, inteligencia artificial y desarrollo tecnológico.", color: "#2563EB", icono: "💻" },
        { id: 4, nombre: "Diseño", descripcion: "Creatividad, diseño gráfico y experiencias centradas en las personas.", color: "#7C3AED", icono: "🎨" },
        { id: 5, nombre: "Investigación", descripcion: "Ciencia, conocimiento y soluciones para los retos actuales.", color: "#0D9488", icono: "🔬" },
        { id: 6, nombre: "Gobernanza", descripcion: "Liderazgo, gestión, transparencia y participación social.", color: "#64748B", icono: "⚖️" },
        { id: 7, nombre: "Bienestar", descripcion: "Salud integral, turismo, gastronomía y calidad de vida.", color: "#15803D", icono: "🌿" }
    ].map(tierra => ({
        ...tierra,
        progreso: Number(localStorage.getItem(`progreso_${tierra.id}`)) || 0
    }));

    const insignias = tierras.filter(tierra => tierra.progreso === 6).length;
    const porcentajeInsignias = Math.round((insignias / tierras.length) * 100);

    document.querySelectorAll("[data-contador-insignias]").forEach(elemento => {
        elemento.textContent = insignias;
    });
    document.getElementById("progresoTexto").textContent = `${insignias} / 7 Tierras`;
    document.getElementById("porcentajeInsignias").textContent = `${porcentajeInsignias}%`;

    renderizarTierras(tierras);
    renderizarPasaporte(tierras);
    configurarPestanas();
}

function renderizarTierras(tierras) {
    const grid = document.getElementById("gridTierras");

    grid.innerHTML = tierras.map(tierra => `
        <article class="tierra-card tierra-descripcion">
            <div class="cabecera-tierra">
                <div class="icono-tierra" style="background: ${tierra.color}">
                    ${tierra.icono}
                </div>
                <div>
                    <small>TIERRA ${tierra.id}</small>
                    <h3>${tierra.nombre}</h3>
                </div>
            </div>
            <p class="descripcion-tierra">${tierra.descripcion}</p>
        </article>
    `).join("");
}

function renderizarPasaporte(tierras) {
    const grid = document.getElementById("gridPasaporte");

    grid.innerHTML = tierras.map(tierra => {
        const porcentaje = (tierra.progreso / 6) * 100;
        const estado = tierra.progreso === 6 ? "Insignia obtenida" : "Actividades pendientes";

        return `
            <article class="tierra-card pasaporte-tierra" onclick="abrirTierra(${tierra.id})">
                <div class="cabecera-tierra">
                    <div class="icono-tierra" style="background: ${tierra.color}">
                        ${tierra.icono}
                    </div>
                    <div>
                        <small>TIERRA ${tierra.id}</small>
                        <h3>${tierra.nombre}</h3>
                    </div>
                </div>
                <p class="progreso">${tierra.progreso} de 6 actividades registradas</p>
                <div class="barra" aria-label="${porcentaje}% completado">
                    <div style="width: ${porcentaje}%"></div>
                </div>
                <div class="footer-tierra">
                    <span>${estado}</span>
                    <span>Ver actividades →</span>
                </div>
            </article>
        `;
    }).join("");
}

function abrirTierra(id) {
    localStorage.setItem("tierra", id);
    window.location.href = "detalle.html";
}

function configurarPestanas() {
    document.querySelectorAll(".nav-link").forEach(boton => {
        boton.addEventListener("click", () => {
            document.querySelector(".nav-link.active")?.classList.remove("active");
            boton.classList.add("active");

            document.querySelectorAll(".panel").forEach(panel => {
                panel.classList.remove("active");
            });

            document.getElementById(`panel-${boton.dataset.panel}`)?.classList.add("active");
        });
    });
}
