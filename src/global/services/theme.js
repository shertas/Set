// Detectar la preferencia del sistema operativo
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Función para aplicar el tema
function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        // 1. Si el usuario ya ha elegido un tema manualmente, lo aplicamos
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
        }
    } else {
        // 2. Si no hay tema guardado, usamos la preferencia del sistema
        if (prefersDarkScheme.matches) {
            // El sistema prefiere oscuro 
            document.body.classList.remove("light-mode"); 
        } else {
            // El sistema prefiere claro
            document.body.classList.add("light-mode");
        }
    }
}

// Aplicar el tema inicial al cargar la página
applyInitialTheme();

// Lógica del botón para cambiar el tema manualmente y guardar la preferencia
document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        // Guardar la nueva preferencia del usuario
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
});

// Escuchar cambios en la preferencia del sistema en tiempo real
prefersDarkScheme.addEventListener("change", (e) => {
    // Si el usuario no ha forzado un tema manualmente, actualizamos
    if (!localStorage.getItem("theme")) {
        if (e.matches) {
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
        }
    }
});

