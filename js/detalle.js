const id = Number(localStorage.getItem("tierra"));

const tierras = {
1:{
nombre:"Cultura",
descripcion:"Conferencias de arte, música y economía creativa.",
color:"#16a34a",
actividades:[
["09:00","Conferencia","Innovación Cultural"],
["12:00","Taller","Branding para Artistas"],
["15:00","Panel","Economía Creativa"]
]
},

2:{
nombre:"Deporte",
descripcion:"Salud, actividad física y emprendimiento deportivo.",
color:"#ea580c",
actividades:[
["10:00","Conferencia","Marketing Fitness"],
["13:00","Taller","Nutrición Deportiva"],
["16:00","Networking","Clubes Universitarios"]
]
},

3:{
nombre:"Tecnología",
descripcion:"IA, programación, software y ciberseguridad.",
color:"#2563eb",
actividades:[
["09:00","Magistral","Inteligencia Artificial"],
["11:00","Taller","Flutter desde Cero"],
["14:00","Panel","Ciberseguridad e Innovación"]
]
},

4:{
nombre:"Diseño",
descripcion:"UX/UI, arquitectura y creatividad.",
color:"#7c3aed",
actividades:[
["09:30","Workshop","UX para Startups"],
["12:30","Taller","Diseño con IA"],
["15:30","Conferencia","Arquitectura Sostenible"]
]
},

5:{
nombre:"Investigación",
descripcion:"Ciencia, patentes e innovación aplicada.",
color:"#0d9488",
actividades:[
["10:00","Coloquio","Patentes Universitarias"],
["13:00","Panel","Investigación Aplicada"],
["16:00","Networking","Vinculación Científica"]
]
},

6:{
nombre:"Gobernanza",
descripcion:"Derecho, transparencia y protección de datos.",
color:"#64748b",
actividades:[
["09:00","Conferencia","Protección de Datos"],
["11:30","Panel","Derecho para Startups"],
["15:00","Taller","Ciberseguridad Fiscal"]
]
},

7:{
nombre:"Bienestar",
descripcion:"Salud integral, turismo y gastronomía.",
color:"#15803d",
actividades:[
["10:00","Taller","Salud y Productividad"],
["13:00","Experiencia","Gastronomía Mexiquense"],
["16:30","Conferencia","Turismo Inteligente"]
]
}
};

const tierra = tierras[id] || tierras[3];

document.getElementById("nombreTierra").textContent=tierra.nombre;
document.getElementById("tituloTierra").textContent="Tierra "+tierra.nombre;
document.getElementById("descripcionTierra").textContent=tierra.descripcion;

const lista=document.getElementById("listaActividades");

tierra.actividades.forEach(act=>{

lista.innerHTML+=`
<div class="tierra actividad">

<div style="display:flex;justify-content:space-between">
<strong>${act[0]}</strong>
<span>${act[1]}</span>
</div>

<h3>${act[2]}</h3>

<button class="qr-btn">
Escanear QR
</button>

</div>
`;

});