const alumno = JSON.parse(localStorage.getItem("alumnoSeleccionado"));

if(!alumno){
    location.href = "panel.html";
}

document.getElementById("nombre").textContent = alumno.nombre;
document.getElementById("nombreCred").textContent = alumno.nombre;

document.getElementById("carrera").textContent = alumno.carrera;
document.getElementById("carreraCred").textContent = alumno.carrera;

document.getElementById("control").textContent =
"Control: " + alumno.control;

const progreso = JSON.parse(
localStorage.getItem("pasaporte_"+alumno.control)
) || [];

const contenedor = document.getElementById("actividades");
const insignias = document.getElementById("insignias");

let hechas = 0;

progreso.forEach(act=>{

    if(act.done) hechas++;

    const card = document.createElement("div");

    card.className = "card-agenda";
    card.style.borderLeft = "6px solid "+act.color;

    card.innerHTML = `
        <div class="agenda-top">

            <span class="agenda-badge"
                  style="background:${act.color}">
                ${act.hora}
            </span>

            ${
                act.done
                ? '<span class="agenda-check">✓</span>'
                : '<span>⏳</span>'
            }

        </div>

        <h3>${act.titulo}</h3>

        <p>${act.descripcion}</p>

        <div class="agenda-info">
            <span>${act.lugar}</span>
        </div>
    `;

    contenedor.appendChild(card);

    const badge = document.createElement("div");

    badge.className =
    "insignia " +
    (act.done ? "desbloqueada":"bloqueada");

    badge.innerHTML = `
        <div class="icono"
             style="background:${act.color}">
            ${act.done ? "🏅":"🔒"}
        </div>

        <h4>Actividad ${act.id}</h4>

        <p>${
            act.done
            ? "Obtenida"
            : "Pendiente"
        }</p>
    `;

    insignias.appendChild(badge);

});

const porcentaje = Math.round((hechas/7)*100);

document.getElementById("porcentaje").textContent =
porcentaje + "%";

document.getElementById("barra").style.width =
porcentaje + "%";

document.getElementById("texto").textContent =
`${hechas} de 7 actividades completadas`;