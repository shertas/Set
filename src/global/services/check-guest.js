// Verificar si el usuario es invitado y redirigir si es necesario
const xhr = new XMLHttpRequest();
xhr.open('GET', '/global/services/is-guest.php', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.is_guest) {
            window.location.href = window.location.pathname + '?page=access-denied';
        }
    }
};

xhr.onerror = function() {
    console.error('Error verificando sesión de invitado');
};

xhr.send();
