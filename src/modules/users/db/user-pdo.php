<?php

require_once __DIR__ . '/../../../global/db/db.php';

class UserPDO
{
    private PDO $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    public function userVerify(string $user, string $pass): bool
    {
        $consulta = "SELECT * FROM users WHERE name = :usuario AND pass = :pass";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':usuario', $user);
        $stmt->bindParam(':pass', $pass);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function userCreate(string $user, string $pass): bool
    {
        $consulta = "INSERT INTO users (name, pass) VALUES (:user, :pass)";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $user);
        $stmt->bindParam(':pass', $pass);
        return $stmt->execute();
    }

    public function userDelete(User $user): bool
    {
        $consulta = "DELETE FROM users WHERE name = :user";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $user->getNombre());
        return $stmt->execute();
    }

    public function userModify(User $user): bool
    {
        $consulta = "UPDATE users SET name = :user, pass = :pass WHERE id = :id";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $user->getNombre());
        $stmt->bindParam(':pass', $user->getClave());
        $stmt->bindParam(':id', $user->getId());
        return $stmt->execute();
    }
}
