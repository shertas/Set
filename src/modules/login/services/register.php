<?php

require_once __DIR__ . '/../../user/db/UserPDO.php';
$pdo = require_once __DIR__ . '/../../../global/db/init.php';

$userBD = new UserPDO($pdo);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $newUser = $_POST['new-user'] ?? null;
    $newPass = $_POST['new-password'] ?? null;
    $confirmPass = $_POST['confirm-password'] ?? null;

    // Validaciones
    if (empty($newUser) || empty($newPass) || empty($confirmPass)) {
        header("Location: ../views/login.html?error=campos_vacios");
        exit;
    }

    if (strlen($newUser) < 4) {
        header("Location: ../views/login.html?error=usuario_corto");
        exit;
    }

    if (strlen($newPass) < 4) {
        header("Location: ../views/login.html?error=password_corta");
        exit;
    }

    if ($newPass !== $confirmPass) {
        header("Location: ../views/login.html?error=passwords_no_coinciden");
        exit;
    }

    if ($userBD->userExists($newUser)) {
        header("Location: ../views/login.html?error=usuario_existe");
        exit;
    }

    // Crear el nuevo usuario
    $created = $userBD->userCreate($newUser, $newPass);

    if ($created) {
        header("Location: ../views/login.html?success=usuario_creado");
        exit;
    } else {
        header("Location: ../views/login.html?error=error_creacion");
        exit;
    }

} else {
    header("Location: ../views/login.html");
    exit;
}
