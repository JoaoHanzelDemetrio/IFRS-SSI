var carregando = false;
// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "img.json";
  var ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var images = JSON.parse(ajax.responseText);
      var divImagens = document.getElementById("images");
      images = shuffle(images);
      
      for (const image of images) {
        var img = document.createElement("img");
        img.src = image.imagemUrl;
        divImagens.appendChild(img);
      }
      carregando = false;
    }
  };
  ajax.send();
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    carregarImagens();
  }
};
carregarImagens();

