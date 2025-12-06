<?php

require_once __DIR__ . '/../src/modules/user/db/user-pdo.php';
$pdo = require_once __DIR__ . '/../src/global/db/init.php';

$userBD = new UserPDO($pdo);



//Si se ha enviado el formulario de login, procesamos la petición:

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = $_POST['user'] ?? null;
    $pass    = $_POST['password'] ?? null;

    //Comprobamos las credenciales
    $user = $userBD->userVerify($nombre, $pass);
    if (isset($nombre) && isset($pass) && $user !== false) {

        // Login correcto, guardamos en sesión
        $_SESSION['usuario'] = $nombre;
        $_SESSION['pass'] = $pass;

        header("Location: ../src/modules/login/views/welcome.html");
        exit;
    } else {
        // Error en login
        header("Location: ../src/modules/login/views/login.html?error=credenciales");
        exit;
    }
}


//Si la sesión está iniciada:
if (isset($_SESSION['usuario'])) {
    $nombre = $_SESSION['usuario'];
    $pass = $_SESSION['pass'];
    // Verificar que el usuario sigue existiendo en la base de datos
    $user = $userBD->userVerify($nombre, $pass);
    if ($user !== false) {
        header("Location: ../src/modules/login/views/welcome.html");
        exit;
    } else {
        // El usuario no existe en la BD, destruir la sesión
        session_unset();
        session_destroy();
        session_start();

        header("Location: ../src/modules/login/views/login.html");
        exit;
    }
} else { //si no está iniciada la sesión, dirigimos a la página de login
    header("Location: ../src/modules/login/views/login.html");
    exit;
}
