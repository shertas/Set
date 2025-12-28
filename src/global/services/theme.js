document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
});

// aplicar tema guardado
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}
