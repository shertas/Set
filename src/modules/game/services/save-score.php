<?php
require_once __DIR__ . '/../../../global/services/session.php';
ensure_session();

require_once __DIR__ . '/../../game/db/GamePDO.php';
require_once __DIR__ . '/../../game/models/Game.php';
// Obtener conexión PDO (si ya existe, usarla; si no, cargarla)
if (!isset($pdo)) {
    $pdo = require __DIR__ . '/../../../global/db/init.php';
}

$gamePDO = new GamePDO($pdo);

// Recibir datos JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Validar que se recibieron todos los datos necesarios
if (
    !isset($data['level']) || !isset($data['pve']) || !isset($data['time']) ||
    !isset($data['setsFound']) || !isset($data['errors']) || !isset($data['score']) || !isset($data['date'])
) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    // Verificar que el usuario está en la sesión
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'error' => 'Usuario no autenticado - sesión no iniciada']);
        exit;
    }

    // Si es invitado, no guardar la partida
    if (isset($_SESSION['is_guest']) && $_SESSION['is_guest'] === true) {
        echo json_encode(['success' => true, 'message' => 'Partida de invitado - no se guarda en BD']);
        exit;
    }

    // Obtener el nombre de usuario de la sesión
    $username = $_SESSION['usuario'];

    // Obtener el id_user usando GamePDO
    $id_user = $gamePDO->getUserIdByUsername($username);

    if ($id_user === false) {
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
    echo json_encode(['success' => false, 'error' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error: ' . $e->getMessage()]);
}
