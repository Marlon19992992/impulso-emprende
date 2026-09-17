// ======================================
// PANEL ADMINISTRADOR
// GENERADOR DE QR
// ======================================

const escenarios = [
    {id:1,nombre:"Cultura",prefijo:"CUL"},
    {id:2,nombre:"Deporte",prefijo:"DEP"},
    {id:3,nombre:"Tecnología",prefijo:"TEC"},
    {id:4,nombre:"Diseño",prefijo:"DIS"},
    {id:5,nombre:"Investigación",prefijo:"INV"},
    {id:6,nombre:"Gobernanza",prefijo:"GOB"},
    {id:7,nombre:"Bienestar",prefijo:"BIE"}
];

const contenedor = document.getElementById("contenedorQR");

// Crear actividades en Supabase
async function generarActividades(){

    contenedor.innerHTML = "";

    for(const escenario of escenarios){

        for(let i=1;i<=6;i++){

            const codigo =
            `IMPULSO2026-${escenario.prefijo}-${String(i).padStart(2,"0")}`;

            // Guardar en Supabase
            await supabase
            .from("actividades")
            .upsert({
                escenario: escenario.id,
                numero: i,
                nombre: `Actividad ${i}`,
                qr: codigo
            },{
                onConflict:"qr"
            });

            // Crear tarjeta visual
            const card = document.createElement("div");
            card.className = "qr-card";

            card.innerHTML = `
                <h3>${escenario.nombre}</h3>
                <small>Actividad ${i}</small>

                <div id="${codigo}" class="qr-img"></div>

                <p>${codigo}</p>
            `;

            contenedor.appendChild(card);

            new QRCode(document.getElementById(codigo),{
                text: codigo,
                width:140,
                height:140
            });

        }

    }

    alert("Los 42 QR fueron creados correctamente.");

}