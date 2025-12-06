<?php

require_once __DIR__ . '/../../../global/db/db.php';

class UserPDO
{
    private PDO $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    public function userVerify(string $user, string $pass)
    {
        $consulta = "SELECT * FROM user WHERE name = :usuario AND pass = :pass";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':usuario', $user);
        $stmt->bindParam(':pass', $pass);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result !== false ? $result : false;
    }

    public function userCreate(string $user, string $pass): bool
    {
        $consulta = "INSERT INTO user (name, pass) VALUES (:user, :pass)";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $user);
        $stmt->bindParam(':pass', $pass);
        return $stmt->execute();
    }

    public function userDelete(User $user): bool
    {
        $consulta = "DELETE FROM user WHERE name = :user";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $user->getNombre());
        return $stmt->execute();
    }

    public function userModify(User $user): bool
    {
        $nombre = $user->getNombre();
        $clave = $user->getClave();
        $id = $user->getId();
        
        $consulta = "UPDATE user SET name = :user, pass = :pass WHERE id_user = :id";
        $stmt = $this->db->prepare($consulta);
        $stmt->bindParam(':user', $nombre);
        $stmt->bindParam(':pass', $clave);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
