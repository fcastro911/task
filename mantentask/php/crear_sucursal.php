<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre_sucursal = trim($_POST['nombre_sucursal']);

    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `sucursal`(`Nombre_Sucursal`) VALUES(:nombre)";

        $stmt = $conn->prepare(query: $sql);
        $stmt->bindParam(':nombre', $nombre_sucursal);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Solicitud creada con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
