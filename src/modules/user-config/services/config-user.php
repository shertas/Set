<?php

require_once __DIR__ . '/../../user/models/user.php';
require_once __DIR__ . '/../../user/db/UserPDO.php';
$pdo = require_once __DIR__ . '/../../../global/db/init.php';

$userBD = new UserPDO($pdo);

// Datos de Ajax
$newName = $_POST['name'] ?? '';
$newPassword = $_POST['password'] ?? '';

// Si el usuario no está loggeado (es invitado), abortamos la función
if (!isset($_SESSION['usuario']) || !isset($_SESSION['pass'])) {
    echo json_encode(['invited' => true]);
    exit;
}

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

