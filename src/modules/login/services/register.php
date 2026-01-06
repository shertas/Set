<?php
// Obtener conexión PDO (si ya existe, usarla; si no, cargarla)
if (!isset($pdo)) {
    $pdo = require __DIR__ . '/../../../global/db/init.php';
}
require_once __DIR__ . '/../../user/db/UserPDO.php';
$userBD = new UserPDO($pdo);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $newUser = $_POST['new-user'] ?? null;
    $newPass = $_POST['new-password'] ?? null;
    $confirmPass = $_POST['confirm-password'] ?? null;

    // Validaciones
    if (empty($newUser) || empty($newPass) || empty($confirmPass)) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=campos_vacios');
        exit;
    }

    if (strlen($newUser) < 4) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=usuario_corto');
        exit;
    }

    if (strlen($newPass) < 4) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=password_corta');
        exit;
    }

    if ($newPass !== $confirmPass) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=passwords_no_coinciden');
        exit;
    }

    if ($userBD->userExists($newUser)) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=usuario_existe');
        exit;
    }

    // Crear el nuevo usuario
    $created = $userBD->userCreate($newUser, $newPass);

    if ($created) {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&success=usuario_creado');
        exit;
    } else {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=error_creacion');
        exit;
    }

} else {
    header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login');
    exit;
}
