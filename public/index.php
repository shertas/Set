<?php
declare(strict_types=1);
session_start();

/*
|--------------------------------------------------------------------------
| Rutas base
|--------------------------------------------------------------------------
*/
define('BASE_PATH', dirname(__DIR__));
define('SRC_PATH', BASE_PATH . '/src');
define('PUBLIC_PATH', BASE_PATH . '/public');

/*
|--------------------------------------------------------------------------
| Autoload / includes
|--------------------------------------------------------------------------
*/
require_once SRC_PATH . '/modules/user/db/UserPDO.php';

$pdo = require SRC_PATH . '/global/db/init.php';
$userBD = new UserPDO($pdo);

/*
|--------------------------------------------------------------------------
| Router básico
|--------------------------------------------------------------------------
*/

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Manejar POST de login primero
if ($method === 'POST' && isset($_POST['user'], $_POST['password'])) {
    $nombre = $_POST['user'];
    $pass   = $_POST['password'];

    $user = $userBD->userVerify($nombre, $pass);
    if ($user !== false) {
        $_SESSION['usuario'] = $nombre;
        $_SESSION['pass'] = $pass;
        unset($_SESSION['is_guest']);
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=welcome');
        exit;
    } else {
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login&error=credenciales');
        exit;
    }
}

// Verificar sesión (si existe, validar; si no, seguirá a la página de login)
if (isset($_SESSION['usuario'])) {
    $nombre = $_SESSION['usuario'];
    $pass = $_SESSION['pass'] ?? null;

    // Permitir sesión de invitado sin verificar en BD
    if (! (isset($_SESSION['is_guest']) && $_SESSION['is_guest'] === true)) {
        $user = $userBD->userVerify($nombre, $pass);
        if ($user === false) {
            session_unset();
            session_destroy();
            session_start();
            header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login');
            exit;
        }
    }
}

// Router principal
$page = $_GET['page'] ?? 'login';

switch ($page) {

    case 'login':
        require SRC_PATH . '/modules/login/views/login.html';
        exit;

    case 'welcome':
        require SRC_PATH . '/modules/login/views/welcome.html';
        exit;

    case 'access-denied':
        require SRC_PATH . '/modules/login/views/access-denied.html';
        exit;

    case 'game':
        require SRC_PATH . '/modules/game/views/game.html';
        exit;

    case 'new-game':
        require SRC_PATH . '/modules/game/services/new-game.php';
        exit;

    case 'game-config':
        require SRC_PATH . '/modules/game-config/views/game-config.html';
        exit;

    case 'user-ranking':
        require SRC_PATH . '/modules/rankings/views/user-ranking.html';
        exit;

    case 'global-ranking':
        require SRC_PATH . '/modules/rankings/views/global-ranking.html';
        exit;

    case 'config-user':
        require SRC_PATH . '/modules/user-config/views/config-user.html';
        exit;

    case 'guest-login':
        require SRC_PATH . '/modules/login/services/guest-login.php';
        exit;

    case 'register':
        require SRC_PATH . '/modules/login/services/register.php';
        exit;

    case 'logout':
        // Destroy session and redirect to login
        session_unset();
        session_destroy();
        header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=login');
        exit;

    default:
        require SRC_PATH . '/modules/login/views/login.html';
        exit;
}


/*
|--------------------------------------------------------------------------
| LOGIN & SESSION handled above in router
|--------------------------------------------------------------------------
*/

