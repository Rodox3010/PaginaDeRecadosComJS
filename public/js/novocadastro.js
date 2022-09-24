const myModal = new bootstrap.Modal("#index-recados");
let createEmail = document.getElementById("criar-novo-cadastro"); // let createEmail = document.getElementById('email-create-input');
let createPassword = document.getElementById("criar-nova-senha"); //let createPassword = document.getElementById('password-create-input');
let createPasswordConfirmation = document.getElementById(
  "confirmar-nova-senha"
); //let createPasswordConfirmation = document.getElementById('password-create-confirmation');
const criarFormulario = document.getElementById("criar-formulario"); //const createForm = document.getElementById('create-form');

const createAccount = document.getElementById("link-conta");

createAccount.addEventListener("click", function () {
  const modalBackdrop = document.querySelector(".modal-backdrop");

  modalBackdrop.style.zIndex = "-1";
});

criarFormulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let camposValidos = validarCampos();

  if (camposValidos) {
    criarUsuario();
  }
});

function validarCampos() {
  if (createPassword.value.length < 6) {
    alert(
      "Sua senha é muito curta! Digite uma senha com pelo menos, 6 caracteres."
    );
    return false;
  }

  if (createPassword.value !== createPasswordConfirmation.value) {
    // as senhas devem ser iguais
    alert("Senhas não conferem");
    return false;
  }

  return true;
}

function criarUsuario() {
  const usuarios = buscarUsuarios();

  let existe = usuarios.some((valor) => valor.email === createEmail.value);

  if (existe) {
    alert("E-mail já cadastrado!");
    return;
  }

  const novoUsuario = {
    email: createEmail.value,
    senha: createPassword.value,
    recados: [],
  };

  usuarios.push(novoUsuario);
  salvarUsuario(usuarios);
  criarFormulario.reset();
  alert("Parabéns você criou a sua conta!!!!");
  myModal.hide();
}

function buscarUsuarios() {
  return JSON.parse(localStorage.getItem("usuariosStorage") || "[]");
}

function salvarUsuario(newUsuario) {
  localStorage.setItem("usuariosStorage", JSON.stringify(newUsuario));
}

// LOGIN DE USUÁRIO
let emailInput = document.getElementById("usuario-logado");
let senhaInput = document.getElementById("senha-entrar");
let formLogin = document.getElementById("login-form");
const warning = document.getElementById("warning");

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();

  logar();
});

function logar() {
  const usuarios = buscarUsuarios();

  const usuarioEncontrado = usuarios.find(
    (valor) =>
      valor.email === emailInput.value && valor.senha === senhaInput.value
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    sessionStorage.setItem("email", emailInput.value);

    warning.innerHTML = "Carregando...";

    setTimeout(() => {
      location.href = "home.html";
    }, 1500);
  } else {
    alert(
      "E-mail ou senha incorretos. Ja possui cadastro? Caso não cadastre-se e tente novamente."
    );
  }
}
