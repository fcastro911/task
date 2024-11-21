<?php
$usuario  = "root";
$password = "";
$servidor = "localhost";
$basededatos = "mantentask";

try {
    $conn = new PDO("mysql:host=$servidor;dbname=$basededatos", $usuario, $password);
    // Establecer el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    die();
}

// Crear la conexión
$conn2 = new mysqli($servidor, $usuario, $password, $basededatos);

// Verificar la conexión
if ($conn2->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


// Establecer conexión usando mysqli
$conexion = mysqli_connect($servidor, $usuario, $password, $basededatos);

// Verificar si la conexión es exitosa
if (!$conexion) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}

// Establecer charset UTF-8
if (!mysqli_set_charset($conexion, "utf8")) {
    printf("Error al cargar el conjunto de caracteres utf8: %s\n", mysqli_error($conexion));
    exit();
}

$pdo = new PDO("mysql:host=$servidor;dbname=$basededatos", $usuario, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



session_start();
