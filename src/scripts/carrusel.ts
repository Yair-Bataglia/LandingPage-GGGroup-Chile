const images = document.querySelectorAll('.carousel-image');
console.log("asdas")

let currentIndex = 0;  // Índice de la imagen que se muestra actualmente

function changeImage() {
  // Eliminar la clase 'active' de la imagen actual
  images[currentIndex].classList.remove('active');

  // Incrementar el índice (circular, vuelve a 0 cuando llega al final)
  currentIndex = (currentIndex + 1) % images.length;

  // Agregar la clase 'active' a la nueva imagen
  images[currentIndex].classList.add('active');
}

setInterval(changeImage, 3000);  // Cambia la imagen cada 3 segundos (3000ms)
