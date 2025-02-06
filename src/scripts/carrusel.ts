let currentIndex = 0;  // Índice de la imagen que se muestra actualmente
let intervalId: ReturnType<typeof setInterval> | null = null;
let images: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");



function changeImage() {
  // Eliminar la clase 'active' de la imagen actual
  images[currentIndex].classList.remove('active');
  
  // Incrementar el índice (circular, vuelve a 0 cuando llega al final)
  currentIndex = (currentIndex + 1) % images.length;
  
  // Agregar la clase 'active' a la nueva imagen
  images[currentIndex].classList.add('active');
}

export function carruselActive() {
  console.log('SE llama a CARRISELACTIVE')
  document.querySelectorAll('.carousel-image');
  images = document.querySelectorAll('.carousel-image');
  
  currentIndex = 0;
  intervalId = setInterval(changeImage, 3000);  // Cambia la imagen cada 3 segundos (3000ms)
}

export function stopCarrusel() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Intervalo detenido");
    intervalId = null;
}
}