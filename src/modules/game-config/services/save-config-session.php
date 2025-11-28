<?php
session_start();

// Recibir datos JSON desde JS
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['level']) && isset($data['pve'])) {
    $_SESSION['level'] = $data['level'];
    $_SESSION['pve'] = $data['pve'];
}
