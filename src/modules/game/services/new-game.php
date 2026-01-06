<?php
session_start();
$level = $_SESSION['level'] ?? 2;
$pve = $_SESSION['pve'] ?? false;
$pveParam = $pve ? '1' : '0';


header('Location: ' . $_SERVER['SCRIPT_NAME'] . '?page=game&level=' . $level . '&pve=' . $pveParam);
exit();
