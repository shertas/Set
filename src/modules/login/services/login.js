document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const toggleLink = document.getElementById("toggle-link");
    const toggleText = document.getElementById("toggle-text");
    const formTitle = document.getElementById("form-title");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    // Validación del formulario de login
    loginForm.addEventListener("submit", function (event) {
        const username = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        if (username === "" || password === "") {
            event.preventDefault();
            // Mostrar como error (no success)
            showToast("Por favor, complete todos los campos.", { type: 'error', duration: 2200 })
        }
    });

    // Validación del formulario de registro (creación de usuario)
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUserInput = document.getElementById("new-user");
        const newPasswordInput = document.getElementById("new-password");
        const confirmPasswordInput = document.getElementById("confirm-password");
        const registerErrorMessage = document.getElementById("register-error-message");

        // Limpiar mensajes de error previos
        registerErrorMessage.style.display = 'none';
        registerErrorMessage.innerHTML = "";

        // Validar cada campo
        let userErrors = validateInput(newUserInput);
        let passwordErrors = validateInput(newPasswordInput);
        let confirmPasswordErrors = validateInput(confirmPasswordInput);

        // Mostrar errores de usuario
        if (userErrors && userErrors.length > 0) {
            registerErrorMessage.style.display = 'block';
            registerErrorMessage.innerHTML = userErrors.join("<br>");
            return;
        }

        // Mostrar errores de contraseña
        if (passwordErrors && passwordErrors.length > 0) {
            registerErrorMessage.style.display = 'block';
            registerErrorMessage.innerHTML = passwordErrors.join("<br>");
            return;
        }

        // Mostrar errores de confirmación de contraseña
        if (confirmPasswordErrors && confirmPasswordErrors.length > 0) {
            registerErrorMessage.style.display = 'block';
            registerErrorMessage.innerHTML = confirmPasswordErrors.join("<br>");
            return;
        }

        // Verificar que las contraseñas coincidan
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            registerErrorMessage.style.display = 'block';
            registerErrorMessage.innerHTML = "Las contraseñas no coinciden";
            return;
        }

        // Si todo está bien, enviar el formulario
        registerForm.submit();
    });


    // Alternar entre formulario de login y registro
    toggleLink.addEventListener("click", function (event) {
        event.preventDefault();

        const registerErrorMessage = document.getElementById("register-error-message");

        if (loginForm.style.display === "none") {
            // Mostrar login
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            formTitle.textContent = "Iniciar Sesión";
            toggleText.innerHTML = '¿No tienes cuenta? <a href="#" id="toggle-link">Crear una nueva</a>';
            errorMessage.style.display = "none";
            successMessage.style.display = "none";
            registerErrorMessage.style.display = "none";
        } else {
            // Mostrar registro
            loginForm.style.display = "none";
            registerForm.style.display = "block";
            formTitle.textContent = "Crear Cuenta";
            toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
            errorMessage.style.display = "none";
            successMessage.style.display = "none";
            registerErrorMessage.style.display = "none";
        }

        // Re-asignar el evento al nuevo enlace
        const newToggleLink = document.getElementById("toggle-link");
        newToggleLink.addEventListener("click", arguments.callee);
    });

    // Detectar errores y mensajes de éxito desde la URL
    const urlParams = new URLSearchParams(window.location.search);

    const error = urlParams.get('error');
    const success = urlParams.get('success');

    if (error) {
        let errorText = "Ha ocurrido un error.";

        switch(error) {
            case 'credenciales':
                errorText = "Usuario o contraseña incorrectos.";
                break;
            case 'campos_vacios':
                errorText = "Por favor, complete todos los campos.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
            case 'usuario_corto':
                errorText = "El nombre de usuario debe tener al menos 4 caracteres.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
            case 'password_corta':
                errorText = "La contraseña debe tener al menos 4 caracteres.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
            case 'passwords_no_coinciden':
                errorText = "Las contraseñas no coinciden.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
            case 'usuario_existe':
                errorText = "El nombre de usuario ya está en uso.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
            case 'error_creacion':
                errorText = "Error al crear el usuario. Intente nuevamente.";
                registerForm.style.display = "block";
                loginForm.style.display = "none";
                formTitle.textContent = "Crear Cuenta";
                toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Iniciar sesión</a>';
                break;
        }

        errorMessage.innerHTML = "<strong>Error:</strong> " + errorText;
        errorMessage.style.display = "block";
    }

    if (success === 'usuario_creado') {
        successMessage.style.display = "block";
    }
});

function validateInput(input) {
    if (input.value.trim() === "") {
        return ["El campo " + input.name + " no puede estar vacío"];
    }

    let errors = [];

    if (/\s/.test(input.value)) {
        errors.push("El campo " + input.name + " no puede contener espacios");
    }
    if (input.value.trim().length < 4) {
        errors.push("El campo " + input.name + " debe tener al menos 4 caracteres");
    }

    return errors.length > 0 ? errors : false;
}