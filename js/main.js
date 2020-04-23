window.onload = carregarDados();

function carregarDados() {
  let input = document.querySelector("#pergunta");
  if (input.value) criarMensagem(input.value, "me");

  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://chatbot-covid.mybluemix.net/chat?mensagem=${
      input.value ? input.value : "sobre"
    }`
  );
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status == 200) {
      let resultado = JSON.parse(xhr.responseText);
      resultado.forEach((resposta) => {
        if (resposta.text) criarMensagem(resposta.text, "bot");
      });
    }
  };

  xhr.send();
  input.value = "";
}

function criarMensagem(msg, tipo) {
  var chat = document.querySelector(".conversa");
  var div = criarDiv(msg, tipo);
  chat.appendChild(div);
  scrollDivDown(chat);
}

function criarDiv(texto, tipo) {
  var div = document.createElement("div");
  var img = document.createElement("img");
  var p = document.createElement("p");
  p.textContent = texto;

  if (tipo == "me") {
    img.setAttribute("src", "images/user.png");
  } else {
    img.setAttribute("src", "images/robo.png");
  }
  img.classList.add("icon");
  div.classList.add("chat");
  div.classList.add(tipo);
  div.appendChild(img);
  div.appendChild(p);
  return div;
}

function scrollDivDown(div) {
  for (var i = 0; i < div.offsetHeight; i++) {
    div.scrollTop++;
  }
}

const input = document.querySelector("#pergunta");
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    carregarDados();
  }
});
