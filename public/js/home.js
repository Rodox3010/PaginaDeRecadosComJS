const registerButton = document.getElementById("botao-cadastrar");
const description = document.getElementById("input-descricao");
const detail = document.getElementById("input-detalhamento");
const table = document.getElementById("recados");
const errandsFrom = document.getElementById("nome_do_usuario");

function buscarUsuarios() {
  return JSON.parse(localStorage.getItem("usuariosStorage") || "[]");
}

function getLoggedUser() {
  return JSON.parse(localStorage.getItem("usuarioLogado") || "[]");
}

function getRecados() {
  const usuarios = buscarUsuarios();
  const loggedUser = getLoggedUser();
  const usuarioEncontrado = usuarios.find(
    (valor) => valor.email === loggedUser.email
  );

  return usuarioEncontrado;
}
const errands = getRecados();

errandsFrom.innerHTML = errands.email;

const usuarios = buscarUsuarios();

function saveErrand() {
  const newErrand = {
    detail: detail.value,
    description: description.value,
  };
  errands.recados.push(newErrand);

  const loggedUser = getLoggedUser();
  const usuarioEncontradoIndex = usuarios.findIndex(
    (valor) => valor.email === loggedUser.email
  );
  usuarios[usuarioEncontradoIndex] = errands;
  localStorage.setItem("usuarioLogado", JSON.stringify(errands));
  localStorage.setItem("usuariosStorage", JSON.stringify(usuarios));
  renderData();
}

function renderData() {
  table.innerHTML = "";
  errands.recados.map((item, index) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const deleteButton = document.createElement("div");
    const editButton = document.createElement("div");

    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td4.style.display = "flex";
    td4.appendChild(deleteButton);
    td4.appendChild(editButton);
    deleteButton.setAttribute("onclick", `deleteErrand(${index})`);
    editButton.setAttribute("onclick", `editErrand(${index})`);
    deleteButton.setAttribute("class", "excluir");
    editButton.setAttribute("class", "editar" );

    td1.innerHTML = index + 1;
    td2.innerHTML = item.description;
    td3.innerHTML = item.detail;
    deleteButton.innerHTML = "Deletar";
    editButton.innerHTML = "Editar";
  });
}

function deleteErrand(index) {
  const responseAlert = prompt(
    "Deseja mesmo excluir? Digite SIM e confime para continuar."
  );
  if (responseAlert === "SIM") {
    errands.recados.splice(index, 1);

    const loggedUser = getLoggedUser();
    const usuarioEncontradoIndex = usuarios.findIndex(
      (valor) => valor.email === loggedUser.email
    );
    usuarios[usuarioEncontradoIndex] = errands;
    localStorage.setItem("usuarioLogado", JSON.stringify(errands));
    localStorage.setItem("usuariosStorage", JSON.stringify(usuarios));
    renderData();
    alert("Exclusao concluida");
  } else {
    alert("Exclusao nao concluida");
  }
  renderData();
}

function editErrand(index) {
  const description = prompt("Nova Descricao");
  const detail = prompt("Novo Detalhe");

  const newErrand = {
    description,
    detail,
  };

  errands.recados[index] = newErrand;

  const loggedUser = getLoggedUser();
  const usuarioEncontradoIndex = usuarios.findIndex(
    (valor) => valor.email === loggedUser.email
  );
  usuarios[usuarioEncontradoIndex] = errands;
  localStorage.setItem("usuarioLogado", JSON.stringify(errands));
  localStorage.setItem("usuariosStorage", JSON.stringify(usuarios));
  renderData();
}

registerButton.addEventListener("click", saveErrand);
renderData();
