<?php
include('../php/bd.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_informe = $_POST['id_informe'];
    $id_maquina = $_POST['maquina'];
    $id_solicitud = $_POST['solicitud'];
    $descripcion = $_POST['descripcion'];
    $fecha_informe = $_POST['fecha_informe'];

    // Actualizar los datos del informe en la base de datos
    $sql = "UPDATE informe SET ID_Solicitud = ?, Descripcion = ?, Fecha_Informe = ? WHERE ID = ?";
    $stmt = $conn2->prepare($sql);
    $stmt->bind_param("issi", $id_solicitud, $descripcion, $fecha_informe, $id_informe);

    if ($stmt->execute()) {
        echo "Informe actualizado correctamente.";
        header('Location: ../app/informes.php'); // Redirigir a la lista de informes
    } else {
        echo "Error al actualizar el informe: " . $stmt->error;
    }
}
