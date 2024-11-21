<?php
include('../php/bd.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $id_solicitud = $_POST['id_solicitud'];
    $maquina = $_POST['maquina'];
    $descripcion = $_POST['descripcion'];
    $estado = $_POST['estado'];

    // Consulta SQL para actualizar la solicitud
    $sql = "UPDATE solicitud SET ID_Maquina = :maquina, Descripcion = :descripcion, ID_Estado = :estado WHERE ID = :id_solicitud";

    // Preparar la consulta
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':maquina', $maquina);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':estado', $estado);
    $stmt->bindParam(':id_solicitud', $id_solicitud);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "Solicitud actualizado correctamente.";
        header('Location: ../app/solicitudes.php'); // Redirigir a la lista de informes
    } else {
        echo "Error al actualizar la solicitud: " . $stmt->error;
    }
}
