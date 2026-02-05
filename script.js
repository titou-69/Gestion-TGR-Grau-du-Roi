function save(key, data) {
localStorage.setItem(key, JSON.stringify(data));
}


function load(key) {
return JSON.parse(localStorage.getItem(key)) || [];
}


function setup(formId, listId, key, template) {
const form = document.getElementById(formId);
const list = document.getElementById(listId);
let data = load(key);


function render() {
list.innerHTML = "";
data.forEach((item, i) => {
const li = document.createElement("li");
li.innerHTML = template(item) + ` <button data-i="${i}">✖</button>`;
li.querySelector("button").onclick = () => {
data.splice(i,1);
save(key,data);
render();
};
list.appendChild(li);
});
}


form.onsubmit = e => {
e.preventDefault();
const values = [...form.querySelectorAll("input,select")].map(i => i.value);
data.push(values);
save(key,data);
form.reset();
render();
};


render();
}


setup("ligneForm","ligneList","lignes",i=>`${i[0]} – ${i[1]} (${i[2]})`);
setup("materielForm","materielList","materiel",i=>`${i[0]} – ${i[1]} | Dépôt: ${i[2]}`);
setup("depotForm","depotList","depots",i=>`${i[0]} (${i[1]})`);
