export function loadPage(page: string): void {
    // Construir la ruta del archivo HTML según la página solicitada
    const filePath = `./pages/${page}.html`;

    // Realizar la solicitud para cargar el archivo HTML
    fetch(filePath)
        .then((response: Response): Promise<string> => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Página no encontrada`);
            }
            return response.text();
        })
        .then((html: string): void => {
            // Crear un elemento temporal para procesar el contenido
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // Extraer solo el contenido que deseas, por ejemplo, lo que está dentro de un div con id 'page-content'
            const pageContent = tempElement.querySelector('#page-content');
            
            // Obtener el contenedor donde se insertará el contenido
            const contentDiv = document.getElementById('content');
            if (contentDiv && pageContent) {
                contentDiv.innerHTML = pageContent.innerHTML; // Insertar solo el contenido específico
            }
        })
        .catch((error: Error): void => {
            // Manejo de errores (por ejemplo, si el archivo no se encuentra)
            const contentDiv = document.getElementById('content');
            if (contentDiv) {
                contentDiv.innerHTML = `<h1>Error 404</h1><p>${error.message}</p>`;
            }
            console.error(error);
        });
}
