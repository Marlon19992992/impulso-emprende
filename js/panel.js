// ======================================
// PANEL ADMINISTRADOR — GENERADOR DE QR
// ======================================

const escenarios = [
    { id: 1, nombre: "Cultura", prefijo: "CUL" },
    { id: 2, nombre: "Deporte", prefijo: "DEP" },
    { id: 3, nombre: "Tecnología", prefijo: "TEC" },
    { id: 4, nombre: "Diseño", prefijo: "DIS" },
    { id: 5, nombre: "Investigación", prefijo: "INV" },
    { id: 6, nombre: "Gobernanza", prefijo: "GOB" },
    { id: 7, nombre: "Bienestar", prefijo: "BIE" }
];

const contenedor = document.getElementById("contenedorQR");
const botonGenerar = document.getElementById("generarQR");

botonGenerar.addEventListener("click", generarActividades);

async function generarActividades() {
    botonGenerar.disabled = true;
    botonGenerar.textContent = "Generando...";
    contenedor.innerHTML = "";

    const actividades = escenarios.flatMap(escenario =>
        Array.from({ length: 7 }, (_, indice) => {
            const numero = indice + 1;
            return {
                escenario: escenario.id,
                numero,
                nombre: `Actividad ${numero}`,
                qr: `IMPULSO2026-${escenario.prefijo}-${String(numero).padStart(2, "0")}`
            };
        })
    );

    const { error } = await supabase
        .from("actividades")
        .upsert(actividades, { onConflict: "qr" });

    if (error) {
        console.error("Error al crear actividades:", error);
        const mensaje = error.code === "42501"
            ? "Supabase bloqueó la creación por sus políticas RLS. Ejecuta supabase/schema.sql en el SQL Editor."
            : "No fue posible crear las actividades en Supabase.";
        alert(mensaje);
        botonGenerar.disabled = false;
        botonGenerar.textContent = "Generar QR";
        return;
    }

    actividades.forEach(actividad => {
        const escenario = escenarios.find(item => item.id === actividad.escenario);
        const tarjeta = document.createElement("article");
        tarjeta.className = "qr-card";
        tarjeta.innerHTML = `
            <h3>${escenario.nombre}</h3>
            <small>Actividad ${actividad.numero}</small>
            <div id="${actividad.qr}" class="qr-img"></div>
            <p>${actividad.qr}</p>
        `;
        contenedor.appendChild(tarjeta);

        new QRCode(document.getElementById(actividad.qr), {
            text: actividad.qr,
            width: 140,
            height: 140
        });
    });

    botonGenerar.textContent = "QR generados";
    alert("Los 49 QR fueron creados o actualizados correctamente.");
}
