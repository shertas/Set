document.getElementById("toggleTheme").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    // Guardar preferencia
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// Aplicar modo guardado al recargar
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

