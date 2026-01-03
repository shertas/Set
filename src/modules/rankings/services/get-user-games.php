<?php

session_start();

require_once __DIR__ . '/../../game/db/GamePDO.php';
$pdo = require_once __DIR__ . '/../../../global/db/init.php';

header('Content-Type: application/json');

// Verificar que hay sesión de usuario
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión de usuario']);
    exit;
}

$username = $_SESSION['usuario'];

// Crear instancia de GamePDO
$gamePDO = new GamePDO($pdo);

// Obtener el id del usuario
$idUser = $gamePDO->getUserIdByUsername($username);

if (!$idUser) {
    echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
    exit;
}

// Obtener las partidas del usuario
$games = $gamePDO->getGamesByUserId($idUser);

echo json_encode(['success' => true, 'games' => $games]);
