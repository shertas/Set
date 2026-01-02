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
    
    $pdo = Db::getConexion(
        $_ENV['DB_HOST'],
        $_ENV['DB_PORT'],
        $_ENV['DB_NAME'],
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection error']);
    die;
}

// Retornar la conexión para que esté disponible
return $pdo;
