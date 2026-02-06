function save(k,d){localStorage.setItem(k,JSON.stringify(d));}
// ---------- BUS ----------
const busForm=document.getElementById("busForm");
const busList=document.getElementById("busList");


busForm.onsubmit=e=>{
e.preventDefault();
bus.push({
num:busNum.value,
constructeur:busConstructeur.value,
modele:busModele.value,
ligne:busLigne.value,
depot:busDepot.value
});
save("bus",bus);
busForm.reset();
renderAll();
};


function renderBus(){
busList.innerHTML="";
bus.forEach(b=>{
const li=document.createElement("li");
li.innerHTML=`<a href="bus.html?num=${b.num}">${b.num}</a> – ${b.modele} (${b.ligne})`;
busList.appendChild(li);
});
}


// ---------- PAGE BUS ----------
function renderBusPage(){
const params=new URLSearchParams(location.search);
const num=params.get("num");
const b=bus.find(x=>x.num===num);
if(!b) return;
document.getElementById("busTitle").textContent=`Bus ${b.num}`;
document.getElementById("busDetails").innerHTML=`
<p><b>Constructeur :</b> ${b.constructeur}</p>
<p><b>Modèle :</b> ${b.modele}</p>
<p><b>Ligne :</b> ${b.ligne}</p>
<p><b>Dépôt :</b> ${b.depot}</p>`;
}


// ---------- SELECTS ----------
function refreshSelects(){
[ligneDepot,busDepot].forEach(s=>{
s.innerHTML="";
depots.forEach(d=>{
const o=document.createElement("option");o.textContent=d.nom;s.appendChild(o);
});
});
busLigne.innerHTML="";
lignes.forEach(l=>{
const o=document.createElement("option");o.textContent=l.nom;busLigne.appendChild(o);
});
}


function renderAll(){
refreshSelects();
renderDepotView();
renderLignes();
renderBus();
}


renderAll();
