const form = document.getElementById("transportForm");
const list = document.getElementById("transportList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const line = document.getElementById("line").value;
  const type = document.getElementById("type").value;
  const schedule = document.getElementById("schedule").value;

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${line}</td>
    <td>${type}</td>
    <td>${schedule}</td>
    <td><button class="delete">Supprimer</button></td>
  `;

  row.querySelector(".delete").addEventListener("click", () => {
    row.remove();
  });

  list.appendChild(row);
  form.reset();
});
