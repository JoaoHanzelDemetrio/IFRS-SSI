async function myRequest(method, url) {
  return new Promise((resolve, reject) => {
    //instanciando o objeto XMLHttpRequest
    let xhr = new XMLHttpRequest();


    //tratamento do retorno
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {

        resolve(JSON.parse(xhr.responseText));

      }
    }
    //tratamento de erro
    xhr.onerror = () => reject(xhr.statusText);
    //configurando a requisição
    xhr.open(method, url, true);
    //enviando a requisição
    xhr.send();
  });

}

async function main() {
  console.log("teste sacana!!!!!");
  try {
    let images = await myRequest('GET', 'img.json');
    //chama o shuffle pra embaralhar o vet images
    var divImagens = document.getElementById("images");
    images = shuffle(images);
    //cria a div e as imagens
    for (const image of images) {
      var img = document.createElement("img");
      img.src = image.imagemUrl;
      divImagens.appendChild(img);
    }




  } catch (error) {
    console.log(error);
  }
}
//função pra randomizar as imagens
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//função do scroll pra gerar mais imagens no final da tela

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    main();
  }
};
