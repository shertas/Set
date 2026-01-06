<?php

session_start();

// Iniciar sesión como invitado
$_SESSION['usuario']    = 'invitado';
$_SESSION['is_guest']   = true;
$_SESSION['pass']       = 'invitado';

// Redirigir a la página de bienvenida
header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=welcome');
exit;
