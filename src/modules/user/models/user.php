<?php

class User
{
    private $id;    //Autoincrementable en la BD
    private string $nombre;
    private string $clave;

    public function __construct($nombre, $clave)
    {
        $this->nombre = $nombre;
        $this->clave = $clave;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getClave()
    {
        return $this->clave;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function setClave($clave)
    {
        $this->clave = $clave;
    }
}
