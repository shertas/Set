<?php

require_once __DIR__ . '/../../../global/db/db.php';
require_once __DIR__ . '/../models/game.php';

class GamePDO
{
    private PDO $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    //Obtiene el id_user a partir del nombre de usuario
    public function getUserIdByUsername(string $username)
    {
        $sql = "SELECT id_user FROM user WHERE name = :username";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['id_user'] : false;
    }

    //Guarda un nuevo registro de juego en la base de datos
    public function saveGame(Game $game, int $idUser): bool
    {
        $sql = "INSERT INTO game (date, level, time, score, correct_set, incorrect_set, id_user)
                VALUES (:date, :level, :time, :score, :correct_set, :incorrect_set, :id_user)";

        $stmt = $this->db->prepare($sql);

        // Extraer valores a variables para bindParam
        $dateISO = $game->getDate();
        // Convertir fecha ISO 8601 a formato MySQL (YYYY-MM-DD HH:MM:SS)
        $date = date('Y-m-d H:i:s', strtotime($dateISO));
        $level = $game->getLevel();
        $time = $game->getTime();
        $score = $game->getScore();
        $correctSet = $game->getSetsFound();
        $incorrectSet = $game->getErrors();

        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':level', $level, PDO::PARAM_INT);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':score', $score, PDO::PARAM_INT);
        $stmt->bindParam(':correct_set', $correctSet, PDO::PARAM_INT);
        $stmt->bindParam(':incorrect_set', $incorrectSet, PDO::PARAM_INT);
        $stmt->bindParam(':id_user', $idUser, PDO::PARAM_INT);

        return $stmt->execute();
    }

    //Obtiene todos los juegos ordenados por puntuación
    public function getAllGamesByScore(): array
    {
        $sql = "SELECT g.id_game, g.date, g.level, g.time, g.score, g.correct_set, g.incorrect_set, u.name as username
                FROM game g
                INNER JOIN user u ON g.id_user = u.id_user
                ORDER BY g.score DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //Obtiene los juegos de un usuario específico con su nombre
    public function getGamesByUserId(int $idUser): array
    {
        $sql = "SELECT
                    g.id_game,
                    g.date,
                    g.level,
                    g.time,
                    g.score,
                    g.correct_set,
                    g.incorrect_set,
                    u.name as username
                FROM game g
                INNER JOIN user u ON g.id_user = u.id_user
                WHERE g.id_user = :id_user
                ORDER BY g.date DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id_user', $idUser, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}