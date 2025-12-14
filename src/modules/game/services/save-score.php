<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/../../user/db/GamePDO.php';
require_once __DIR__ . '/../../user/models/game.php';
$pdo = require_once __DIR__ . '/../../../global/db/init.php';

$gamePDO = new GamePDO($pdo);

// Recibir datos JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Validar que se recibieron todos los datos necesarios
if (!isset($data['level']) || !isset($data['pve']) || !isset($data['time']) ||
    !isset($data['setsFound']) || !isset($data['errors']) || !isset($data['score']) || !isset($data['date'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    // Verificar que el usuario está en la sesión
    if (!isset($_SESSION['usuario'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Usuario no autenticado - sesión no iniciada']);
        exit;
    }

    // Obtener el nombre de usuario de la sesión
    $username = $_SESSION['usuario'];

    // Obtener el id_user usando GamePDO
    $id_user = $gamePDO->getUserIdByUsername($username);

    if ($id_user === false) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
        exit;
    }

    // Crear instancia de Game con los datos recibidos
    $game = new Game(
        $data['level'],
        $data['pve'],
        $data['time'],
        $data['setsFound'],
        $data['errors'],
        $data['score'],
        $data['date']
    );

    // Guardar el juego usando GamePDO con el objeto Game
    $success = $gamePDO->saveGame($game, $id_user);

    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Score guardado correctamente']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al guardar el score']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error: ' . $e->getMessage()]);
}
