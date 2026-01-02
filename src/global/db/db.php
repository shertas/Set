<?php

namespace App\db;

use PDO;

/**
 * Clase que representa el singleton de la conexión a la Base de Datos
 */
class Db
{
    /*
     * @var ?PDO $db Almacena la única instancia PDO de conexión
     */

    protected static ?PDO $db = null;

    /**
     * Constructor privado de la clase BD
     * 
     * @param string $host Nombre del Host donde reside el servidor de la base de datos
     * @param string $port Número del puerto donde escucha el servidor de la base de datos
     * @param string $database Nombre de la base de datos del juego
     * @param string $user Nombre del usuario para acceder a la base de datos 
     * @param string $password Password del usuario
     * 
     * @returns void
     */
    private function __construct(string $host, string $port, string $database, string $user, string $password)
    {
        // Use host and port separately in the DSN
        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_CASE => PDO::CASE_NATURAL,
        ];

        // Support for Aiven CA certificate
        $caPath = getenv('AIVEN_CA_PEM_PATH') ?: null;
        $caBase64 = getenv('AIVEN_CA_PEM_BASE64') ?: null;

        // If only base64 is provided, decode it to a secure temp file
        if (!$caPath && $caBase64) {
            $tmp = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'aiven-ca-' . uniqid() . '.pem';
            $decoded = base64_decode($caBase64, true);
            if ($decoded !== false && file_put_contents($tmp, $decoded) !== false) {
                @chmod($tmp, 0600);
                $caPath = $tmp;
            }
        }

        // If PDO::MYSQL_ATTR_SSL_CA is available and a CA path exists, set it
        if ($caPath && is_file($caPath) && defined('PDO::MYSQL_ATTR_SSL_CA')) {
            $options[PDO::MYSQL_ATTR_SSL_CA] = $caPath;
        }

        self::$db = new \PDO($dsn, $user, $password, $options);
    }

    /**
     * Obtiene una instancia del singleton
     * 
     * @param string $host Nombre del Host donde reside el servidor de la base de datos
     * @param string $port Número del puerto donde escucha el servidor de la base de datos
     * @param string $database Nombre de la base de datos del juego
     * @param string $user Nombre del usuario para acceder a la base de datos 
     * @param string $passwrod Password del usuario
     * 
     * @returns void
     */
    public static function getConexion(string $host, string $port, string $database, string $user, string $password)
    {
        if (!self::$db) {
            new Db($host, $port, $database, $user, $password);
        }
        return self::$db;
    }
}
