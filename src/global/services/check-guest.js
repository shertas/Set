// Verificar si el usuario es invitado y redirigir si es necesario
const xhr = new XMLHttpRequest();
xhr.open('GET', '/src/global/services/is-guest.php', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.is_guest) {
            window.location.href = '/src/modules/login/views/access-denied.html';
        }
    }
};

xhr.onerror = function() {
    console.error('Error verificando sesión de invitado');
};

xhr.send();
