<?php
// Asegurarse de que la sesión está iniciada antes de acceder a $_SESSION
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
// Devolver siempre JSON para las respuestas AJAX
header('Content-Type: application/json');

require_once __DIR__ . '/../../user/models/User.php';
require_once __DIR__ . '/../../user/db/UserPDO.php';
// Obtener conexión PDO (si ya existe, usarla; si no, cargarla)
if (!isset($pdo)) {
    $pdo = require __DIR__ . '/../../../global/db/init.php';
}

$userBD = new UserPDO($pdo);

// Verificar si es una petición de eliminación
$action = $_POST['action'] ?? 'update';

if ($action === 'delete') {
    try {
        // Verificar que hay una sesión activa
        if (!isset($_SESSION['usuario']) || !isset($_SESSION['pass'])) {
            echo json_encode(['error' => 'No hay sesión activa']);
            exit;
        }

        // Verificar que no sea un usuario invitado
        if (isset($_SESSION['is_guest']) && $_SESSION['is_guest'] === true) {
            echo json_encode(['error' => 'Los usuarios invitados no pueden ser eliminados']);
            exit;
        }

        $currentName = $_SESSION['usuario'];
        $currentPass = $_SESSION['pass'];

        // Verificar que el usuario existe
        $userData = $userBD->userVerify($currentName, $currentPass);

        if ($userData === false) {
            echo json_encode(['error' => 'Usuario no encontrado']);
            exit;
        }

        // Crear el objeto User para eliminar
        $user = new User($userData['name'], $userData['pass']);
        $user->setId($userData['id_user']);

        // Eliminar el usuario de la base de datos
        if ($userBD->userDelete($user)) {
            // Destruir la sesión
            session_unset();
            session_destroy();

            echo json_encode(['success' => 'Usuario eliminado correctamente']);
        } else {
            echo json_encode(['error' => 'Error al eliminar el usuario']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }
    exit;
}

// Datos de Ajax para actualización
$newName = $_POST['name'] ?? '';
$newPassword = $_POST['password'] ?? '';

// Si se envía sin datos, devolvemos un error
if (empty($newName) && empty($newPassword)) {
    echo json_encode(['error' => 'Sin datos que actualizar']);
    exit;
}

try {
    // Datos actuales
    $currentName = $_SESSION['usuario'];
    $currentPass = $_SESSION['pass'];

    $userData = $userBD->userVerify($currentName, $currentPass);

    if ($userData === false) {
        echo json_encode(['error' => 'Usuario de la sesión no encontrado']);
        exit;
    }

    // Creamos el nuevo usuario con los datos actualizados
    $finalName = (!empty($newName)) ? $newName : $userData['name'];
    $finalPassword = (!empty($newPassword)) ? $newPassword : $userData['pass'];

    $user = new User($finalName, $finalPassword);
    $user->setId($userData['id_user']);

    // Actualizamos la base de datos y la sesión
    if ($userBD->userModify($user)) {
        $_SESSION['usuario'] = $finalName;
        $_SESSION['pass'] = $finalPassword;
        echo json_encode(['success' => 'Usuario actualizado correctamente']);
    } else {
        echo json_encode(['error' => 'Error al actulizar el usuario']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
