<?php
// Endpoint para verificar si el usuario es invitado
require_once __DIR__ . '/../services/session.php';
ensure_session();

header('Content-Type: application/json');

$is_guest = isset($_SESSION['is_guest']) && $_SESSION['is_guest'] === true;

echo json_encode(['is_guest' => $is_guest]);
