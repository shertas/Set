<?php
require_once __DIR__ . '/../../../global/services/session.php';
ensure_session();

require_once __DIR__ . '/../../game/db/GamePDO.php';
// Obtener conexión PDO (si ya existe, usarla; si no, cargarla)
if (!isset($pdo)) {
    $pdo = require __DIR__ . '/../../../global/db/init.php';
}

header('Content-Type: application/json');

// Verificar que hay sesión de usuario
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión de usuario']);
    exit;
}

$username = $_SESSION['usuario'];

// Crear instancia de GamePDO
$gamePDO = new GamePDO($pdo);

// Obtener partidas usuarios
$games = $gamePDO->getAllGamesByScore();

echo json_encode(['success' => true, 'games' => $games]);
