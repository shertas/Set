<?php
require_once __DIR__ . '/../../../global/services/session.php';
ensure_session();

// Iniciar sesión como invitado
$_SESSION['usuario']    = 'invitado';
$_SESSION['is_guest']   = true;
$_SESSION['pass']       = 'invitado';

// Redirigir a la página de bienvenida
header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=welcome');
exit;
