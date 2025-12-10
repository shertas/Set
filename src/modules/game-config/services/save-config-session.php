<?php
session_start();

// Recibir datos JSON desde JS
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['level']) && isset($data['pve'])) {
    $_SESSION['level'] = $data['level'];
    $_SESSION['pve'] = $data['pve'];

    // Enviar respuesta exitosa
    echo json_encode(['success' => true]);
} else {
    // Enviar respuesta de error
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
}
