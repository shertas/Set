// Funcionalidad para mostrar/ocultar contraseña
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password")
    const toggleButton = document.getElementById("togglePassword")

    if (passwordInput.type === "password") {
        passwordInput.type = "text"
        toggleButton.textContent = "🙈"
    } else {
        passwordInput.type = "password"
        toggleButton.textContent = "👁️"
    }
})

// Funcionalidad para enviar el formulario
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    let nameInput = document.getElementById("user")
    let passwordInput = document.getElementById("password")
    let text = document.getElementById("text_message")
    text.style.display = 'none'
    text.innerHTML = ""

    //Comprobación de errores:
    let name_Errors = validate_Input(nameInput)
    let password_Errors = validate_Input(passwordInput)

    let name = ""
    let password = ""

    //Comprobación para nombre
    if (name_Errors && name_Errors !== false && name_Errors.length > 0) {   //Si hay errores, los muestra
        text.style.display = 'block'
        text.innerHTML += name_Errors.join("<br>")
        return
    } else {  //Si está correcto, se envían el valor
        name = nameInput.value
    }

    //Comprobación para contraseña
    if (password_Errors && password_Errors !== false && password_Errors.length > 0) {
        text.style.display = 'block'
        text.innerHTML += password_Errors.join("<br>")
        return
    } else {
        password = passwordInput.value
    }

    //Enviamos el formulario
    send_Ajax(name, password)

})

function validate_Input(input) {

    if (input.value.trim() === "") {    //campo vacío, nada que hacer
        return undefined
    }

    let errors = []

    if (/\s/.test(input.value)) {    //inválido: tiene espacios
        errors.push("El campo " + input.name + " tiene espacios")
    }
    if (input.value.trim().length < 4) {    //inválido: demasiado corto
        errors.push("El campo " + input.name + " es demasiado corto")
    }

    if (errors.length == 0) {
        return false
    } else {
        return errors
    }

}

function send_Ajax(name, password) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)

    fetch('/modules/user-config/services/config-user.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.invited === true) {
                alert('El usuario es invitado y no puede modificar sus datos')
                return
            }
            if (data.error) {
                console.error('Error al actualizar los datos:', data.error)
                alert('Error al actualizar los datos')
                return
            }
            console.log('Datos actualizados correctamente')
            alert('Datos actualizados correctamente')
        })
        .catch(error => {
            console.error('Error al actualizar los datos:', error)
            alert('Error al actualizar los datos')
        })
}

// Funcionalidad para eliminar usuario
document.getElementById("eliminar").addEventListener("click", function () {
    // Confirmar antes de eliminar
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.')) {
        deleteUser()
    }
})

function deleteUser() {
    const formData = new FormData()
    formData.append('action', 'delete')

    fetch('/modules/user-config/services/config-user.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al eliminar usuario:', data.error)
                alert('Error: ' + data.error)
            } else {
                alert(data.success)
                // Redirigir al login después de eliminar
                window.location.href = window.location.pathname + '?page=login'
            }
        })
        .catch(error => {
            console.error('Error al eliminar usuario:', error)
            alert('Error al eliminar el usuario')
        })
}