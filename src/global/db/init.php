<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

use App\db\Db;
use Dotenv\Dotenv;

// Ruta a la raíz del proyecto

$rootPath = dirname(__DIR__, 3);

// Cargar .env SOLO si existe (local)

$envFile = $rootPath . '/.env';
if (file_exists($envFile)) {
    $dotenv = Dotenv::createImmutable($rootPath);
    $dotenv->load();
}

// Crear la conexión usando la clase Db
try {

    $host = $_ENV['DB_HOST'] ?? getenv('DB_HOST');
    $port = $_ENV['DB_PORT'] ?? getenv('DB_PORT');
    $db   = $_ENV['DB_NAME'] ?? getenv('DB_NAME');
    $user = $_ENV['DB_USER'] ?? getenv('DB_USER');
    $pass = $_ENV['DB_PASS'] ?? getenv('DB_PASS');

    $pdo = Db::getConexion($host, $port, $db, $user, $pass);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection error',
        'message' => $e->getMessage()]);
    
    die;
}

// Retornar la conexión para que esté disponible
return $pdo;
