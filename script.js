function save(k,d){localStorage.setItem(k,JSON.stringify(d));}
opt.textContent=l.nom;
matLigne.appendChild(opt);
});
}


ligneForm.onsubmit=e=>{
e.preventDefault();
lignes.push({nom:ligneNom.value,horaire:ligneHoraire.value});
save("lignes",lignes);
ligneForm.reset();
renderAll();
};


// ---------- MATERIEL ----------
const matForm=document.getElementById("materielForm");
const matList=document.getElementById("materielList");


function renderMateriel(){
matList.innerHTML="";
materiel.forEach((m,i)=>{
const li=document.createElement("li");
li.textContent=`${m.nom} | Dépôt:${m.depot} | Ligne:${m.ligne||"—"} | ${m.etat}`;


const sel=document.createElement("select");
["En service","Réserve","Panne"].forEach(e=>{
const o=document.createElement("option");o.textContent=e;o.selected=e===m.etat;sel.appendChild(o);
});
sel.onchange=()=>{m.etat=sel.value;save("materiel",materiel);};


const b=document.createElement("button");b.textContent="✖";
b.onclick=()=>{materiel.splice(i,1);save("materiel",materiel);renderAll();};


li.append(sel,b);
matList.appendChild(li);
});
}


matForm.onsubmit=e=>{
e.preventDefault();
materiel.push({
nom:matNom.value,
depot:matDepot.value,
ligne:matLigne.value,
etat:matEtat.value
});
save("materiel",materiel);
matForm.reset();
renderAll();
};


// ---------- STATS ----------
const statsList=document.getElementById("statsList");
function renderStats(){
statsList.innerHTML="";
lignes.forEach(l=>{
const count=materiel.filter(m=>m.ligne===l.nom).length;
const li=document.createElement("li");
li.textContent=`${l.nom} : ${count} véhicule(s)`;
statsList.appendChild(li);
});
}


function renderAll(){renderLignes();renderMateriel();renderStats();}
renderAll();
