<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre_tipo_usuario = trim($_POST['nombre_tipo_usuario']);

    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `tipo_usuario`(`Nombre_Usuario`) VALUES(:nombre)";

        $stmt = $conn->prepare(query: $sql);
        $stmt->bindParam(':nombre', $nombre_tipo_usuario);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Tipo de Usuario creado con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
