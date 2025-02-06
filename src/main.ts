import { loadPage } from './scripts/spa';
import { carruselActive, stopCarrusel } from './scripts/carrusel'

function navigate(page: string): void {
    // Cambiar la URL sin recargar la página
    history.pushState({ page }, "", `#${page}`);
    loadPage(page); // Cargar el contenido correspondiente
}

// Manejar la navegación al retroceder/avanzar en la historia
window.addEventListener("popstate", (event: PopStateEvent): void => {
    if (event.state && event.state.page) {
        loadPage(event.state.page as string);
    }
});

// Detectar el clic en los enlaces de navegación y cargar la página correspondiente
document.addEventListener("DOMContentLoaded", (): void => {
    const links = document.querySelectorAll('nav a:not(.ignorar)');
    links.forEach(link => {
        link.addEventListener('click', (e: Event) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            const page = (e.target as HTMLAnchorElement).getAttribute('data-page') || '';
            navigate(page); // Navegar a la página seleccionada
            console.log(page)

            if (page == "quienes-somos") {
                const script = document.createElement('script');
                script.src = './scripts/carrusel.ts';
                script.async = true; // Asíncrono
                document.head.appendChild(script);
            }
        });
    });

    // Cargar la página inicial
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page); // Cargar la página correspondiente a la URL
});


// Crear un MutationObserver que escucha los cambios en el DOM
const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {

            // Revisamos si el elemento que buscamos fue agregado
            let carruselSection = document.querySelector('.carousel');
            if (carruselSection) {
                // Se encontró el carrusel, ahora podemos realizar las acciones necesarias
                carruselActive()// Aquí puedes cargar el script
            }else{
                stopCarrusel()
            }
        }
    });
});

// Configurar el observer para escuchar en todo el documento
observer.observe(document.body, { childList: true, subtree: true });
