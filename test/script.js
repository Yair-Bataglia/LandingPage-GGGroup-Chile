// Función para cargar una página con fetch()
function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            const content = document.getElementById('content');
            content.classList.remove("fade-in"); // Reset animation
            content.innerHTML = html;
            void content.offsetWidth; // Hack para reiniciar animación
            content.classList.add("fade-in");
        })
        .catch(() => {
            document.getElementById('content').innerHTML = "<h2>Error 404</h2><p>Página no encontrada.</p>";
        });
}

// Función para manejar la navegación sin recargar
function navigateTo(page) {
    history.pushState({ page }, "", `#${page}`);
    loadPage(page);
}

// Manejar la navegación al retroceder/avanzar en la historia
window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
});

// Cargar la página inicial según la URL
document.addEventListener("DOMContentLoaded", () => {
    const page = location.hash.replace("#", "") || "home";
    loadPage(page);
});
