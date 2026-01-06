CREATE DATABASE juego_set 
CHARACTER SET utf8mb4;

CREATE TABLE user(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    pass VARCHAR(255) NOT NULL  
);

CREATE TABLE game(
    id_game INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    level VARCHAR(20) NOT NULL,
    time time,
    score int,
    correct_set INT,
    incorrect_set INT,
    pve tinyint(1),
    id_user INT,
    CONSTRAINT fk_partidas_usuario 
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);