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
        $dsn = "mysql:host=" . "$host:$port" . ";dbname=" . $database . ";charset=utf8mb4";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_CASE => PDO::CASE_NATURAL,
        ];

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
