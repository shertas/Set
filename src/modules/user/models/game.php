<?php

class Game {
    private $id;    //Autoincrementable en la BD
    private $level;
    private $pve;
    private $time;
    private $setsFound;
    private $errors;
    private $score;
    private $date;

    function __construct($level, $pve, $time, $setsFound, $errors, $score, $date) {
        $this->level = $level;
        $this->pve = $pve;
        $this->time = $time;
        $this->setsFound = $setsFound;
        $this->errors = $errors;
        $this->score = $score;
        $this->date = $date;
    }

    public function getId() { 
        return $this->id; 
    }
    public function getLevel() { 
        return $this->level; 
    }
    public function getPve() { 
        return $this->pve; 
    }
    public function getTime() { 
        return $this->time; 
    }
    public function getSetsFound() { 
        return $this->setsFound; 
    }
    public function getErrors() { 
        return $this->errors; 
    }
    public function getScore() { 
        return $this->score; 
    }
    public function getDate() { 
        return $this->date; 
    }

    public function setId($id) { 
        $this->id = $id; 
    }
    public function setLevel($level) { 
        $this->level = $level; 
    }
    public function setPve($pve) { 
        $this->pve = $pve; 
    }
    public function setTime($time) { 
        $this->time = $time; 
    }
    public function setSetsFound($setsFound) { 
        $this->setsFound = $setsFound; 
    }
    public function setErrors($errors) { 
        $this->errors = $errors; 
    }
    public function setScore($score) { 
        $this->score = $score; 
    }
    public function setDate($date) { 
        $this->date = $date;
    }
    
}