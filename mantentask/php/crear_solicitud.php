<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $maquina = trim($_POST['maquina']);
    $descripcion = trim($_POST['descripcion']);
    $estado = trim($_POST['estado']);

    $id_usuario =  $_SESSION['user_id'];

    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `solicitud`(`ID_Maquina`, `ID_Usuario`, `Descripcion`, `ID_Estado`) VALUES (:maquina, :username, :descripcion, :estado)";

        $stmt = $conn->prepare(query: $sql);
        $stmt->bindParam(':maquina', $maquina);
        $stmt->bindParam(':username', $id_usuario);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':estado', $estado);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Solicitud creada con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
