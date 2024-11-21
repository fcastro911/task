<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre_estado = trim($_POST['nombre_estado']);

    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `estado`(`Estado`) VALUES(:nombre)";

        $stmt = $conn->prepare(query: $sql);
        $stmt->bindParam(':nombre', $nombre_estado);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Estado creado con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
