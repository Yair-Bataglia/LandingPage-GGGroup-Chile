import { loadPage } from './scripts/spa';

function navigate(page: string): void {
    history.pushState({ page }, "", `#${page}`);
    loadPage(page);
}

window.addEventListener("popstate", (event: PopStateEvent): void => {
    if (event.state && event.state.page) {
        loadPage(event.state.page as string);
    }
});

document.addEventListener("DOMContentLoaded", (): void => {
    const page: string = location.hash.replace("#", "") || "home";
    loadPage(page);

    // Seleccionar todos los enlaces y añadirles el manejador de eventos
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir la recarga completa de la página
            const page = link.getAttribute('href')?.replace('#', '') || '';
            navigate(page);
        });
    });
});
