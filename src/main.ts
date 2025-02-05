import { loadPage } from './scripts/spa';

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
            const carruselSection = document.querySelector('.carousel');
            if (carruselSection) {
                // Se encontró el carrusel, ahora podemos realizar las acciones necesarias
                console.log("Carrusel agregado");
                loadCarruselScript(); // Aquí puedes cargar el script
                observer.disconnect(); // Dejas de observar una vez que el carrusel fue encontrado
            }
            console.log("no se cargo")
        }
    });
});

// Configurar el observer para escuchar en todo el documento
observer.observe(document.body, { childList: true, subtree: true });

// Función para cargar el script del carrusel
function loadCarruselScript() {
    const script = document.createElement('script');
    script.src = '/src/scripts/carrusel.ts'; // Ruta del script carrusel
    script.type = 'module'; // Asegurarse de que es un módulo
    script.async = true; // Cargarlo de forma asíncrona
    document.head.appendChild(script); // Agregar el script al head
}