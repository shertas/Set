document.addEventListener("DOMContentLoaded", function () {

    //Si se detecta un error al enviar el formulario
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", function (event) {
        const username = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        if (username === "" || password === "") {
            event.preventDefault();
            alert("Por favor, complete todos los campos.");
        }
    });

    // Detectar si hay un error en desde index.php
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'credenciales') {
        document.getElementById('error-message').style.display = 'block';
    }
});