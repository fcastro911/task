<?php
include('../php/bd.php'); // Incluir la conexión a la base de datos

// Verificar si se pasó el ID del informe a través de la URL
if (isset($_GET['id'])) {
    $id_solicitud = $_GET['id'];

    // Preparar la consulta SQL para eliminar el informe
    $sql = "DELETE FROM solicitud WHERE ID = ?";
    $stmt = $conn2->prepare($sql);
    
    // Enlazar el parámetro ID
    $stmt->bind_param("i", $id_solicitud);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Redirigir a la página de informes después de eliminar el informe
header('Location: ../app/solicitudes.php'); 
        exit();
    } else {
        // Mostrar mensaje de error si no se pudo eliminar el informe
        echo "Error al eliminar el informe: " . $stmt->error;
    }
} else {
    // Si no se pasa el ID, redirigir al listado de informes
    header('Location: ../app/solicitudes.php'); 
    exit();
}
?>
