<?php

session_start();

// Iniciar sesión como invitado
$_SESSION['usuario'] = 'invitado';
$_SESSION['is_guest'] = true;

// Redirigir a la página de bienvenida
header("Location: ../views/welcome.html");
exit;
