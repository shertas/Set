<?php
session_start();
$level = $_SESSION['level'] ?? 2;
$pve = $_SESSION['pve'] ?? false;
$pveParam = $pve ? '1' : '0';


header("Location: ../../game/views/game.html?level={$level}&pve={$pveParam}");
exit();
