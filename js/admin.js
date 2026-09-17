const escenarios = [
    { prefijo:"CUL", nombre:"Cultura" },
    { prefijo:"DEP", nombre:"Deporte" },
    { prefijo:"TEC", nombre:"Tecnología" },
    { prefijo:"DIS", nombre:"Diseño" },
    { prefijo:"INV", nombre:"Investigación" },
    { prefijo:"GOB", nombre:"Gobernanza" },
    { prefijo:"BIE", nombre:"Bienestar" }
];

const contenedor = document.getElementById("contenedorQR");

escenarios.forEach(escenario=>{

    for(let i=1;i<=6;i++){

        const codigo =
        `IMPULSO2026-${escenario.prefijo}-${String(i).padStart(2,"0")}`;

        const card = document.createElement("div");

        card.className = "qr-card";

        card.innerHTML = `
            <h3>${escenario.nombre}</h3>
            <small>Actividad ${i}</small>

            <div class="qr-img" id="${codigo}"></div>

            <p>${codigo}</p>
        `;

        contenedor.appendChild(card);

        new QRCode(document.getElementById(codigo),{
            text: codigo,
            width:140,
            height:140
        });

    }

});