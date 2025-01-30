export function loadPage(page: string): void {
    fetch(`../pages/${page}.html`)
        .then((response: Response): Promise<string> => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Pagina no encontrada`)
            }
            return response.text();
        })
        .then((html: string): void => {
            const content: HTMLElement | null = document.getElementById('content');

            if (content) {
                content.classList.remove("fade-in"); // Reset animation
                content.innerHTML = html;
                void content.offsetWidth; // Hack para reiniciar animación
                content.classList.add("fade-in");
            }
        })
        .catch((error: Error): void => {
            const content: HTMLElement | null = document.getElementById('content');
            if (content) {
                content.innerHTML = `<h2>Error 404</h2><p>${error.message}</p>`;
            }
            console.error(error);
        });
}