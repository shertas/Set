<?php
// Endpoint para verificar si el usuario es invitado

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');

$is_guest = isset($_SESSION['is_guest']) && $_SESSION['is_guest'] === true;

echo json_encode(['is_guest' => $is_guest]);
