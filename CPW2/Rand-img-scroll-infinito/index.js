const imagens = [
  "./img/imagem1.jpg",
  "./img/imagem2.jpg",
  "./img/imagem3.jpg",
  "./img/imagem4.jpg",
  "./img/imagem5.jpg",
  "./img/imagem6.jpg",
  "./img/imagem7.jpg",
  "./img/imagem8.jpg",
  "./img/imagem9.jpg",
  "./img/imagem10.jpg",
  "./img/imagem11.jpg",
  "./img/imagem12.jpg",
  "./img/imagem13.jpg",
  "./img/imagem14.jpg",
  "./img/imagem15.jpg",
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imagens.length);
  return imagens[randomIndex];
}


function loadImages() {
  const numImagesToLoad = 5;
  const container = document.querySelector('#image-container');

  for (let i = 0; i < numImagesToLoad; i++) {
    const imagens = getRandomImage();
    const img = document.createElement('img');
    img.src = imagens;
    container.appendChild(img);
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadImages();
  }
});
