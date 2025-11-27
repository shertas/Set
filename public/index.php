<?php

session_start();

require_once __DIR__ . '/../src/global/db/db.php';
require_once __DIR__ . '/../src/modules/users/db/user-pdo.php';
require_once __DIR__ . '/../vendor/autoload.php';

use App\db\Db;
use Dotenv\Dotenv;

// Ruta a la raíz del proyecto
$rootPath = dirname(__DIR__, 1);

$dotenv = Dotenv::createImmutable($rootPath);
$dotenv->load();

// Crear la conexión usando la clase BD
try {
    $pdo = Db::getConexion(
        $_ENV['DB_HOST'],
        $_ENV['DB_PORT'],
        $_ENV['DB_NAME'],
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    );
} catch (PDOException $e) {
    echo "❌ Error de conexión: " . $e->getMessage() . "<br>";
    die;
}



$userBD = new UserPDO($pdo);

//Si se ha enviado el formulario de login, procesamos la petición:

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = $_POST['user'] ?? null;
    $pass    = $_POST['password'] ?? null;

    //Comprobamos las credenciales
    if (isset($nombre) && isset($pass) && $userBD->userVerify($nombre, $pass)) {

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
    if ($userBD->userVerify($nombre, $pass)) {
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
