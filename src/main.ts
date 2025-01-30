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
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e: Event) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            const page = (e.target as HTMLAnchorElement).getAttribute('data-page') || '';
            navigate(page); // Navegar a la página seleccionada
        });
    });

    // Cargar la página inicial
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page); // Cargar la página correspondiente a la URL
});
