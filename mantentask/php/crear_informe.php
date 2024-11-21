<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $maquina = trim($_POST['maquina']);
    $solicitud = trim($_POST['solicitud']);
    $descripcion = trim($_POST['descripcion']);
    $fecha_informe = trim($_POST['fecha_informe']);

    $id_usuario =  $_SESSION['user_id'];
    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `informe`(`ID_Usuario`, `ID_Solicitud`, `Descripcion`, `Fecha_Informe`) VALUES (:username, :solicitud, :descripcion, :Fecha_Informe)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $id_usuario);
        $stmt->bindParam(':solicitud', $solicitud);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':Fecha_Informe', $fecha_informe);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Informe creado con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
