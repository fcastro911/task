<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sucursal = trim($_POST['sucursal']);

    $marca = trim($_POST['marca']);
    $modelo = trim($_POST['modelo']);
    $fecha_compra = trim($_POST['fecha_compra']);
    $fecha_instalacion = trim($_POST['fecha_instalacion']);
    $fecha_mantenimiento = trim($_POST['fecha_mantenimiento']);

    try {
        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `maquinas`(`ID_Sucursal`, `Marca`, `Modelo`, `Fecha_Compra`, `Fecha_Instalacion`, `Fecha_Mantencion`) VALUES  ( :sucursal,:marca,:modelo,:fecha_compra,:fecha_instalacion, :fecha_mantenimiento)";

        $stmt = $conn->prepare(query: $sql);
        $stmt->bindParam(':sucursal', $sucursal);
        $stmt->bindParam(':marca', $marca);
        $stmt->bindParam(':modelo', $modelo);
        $stmt->bindParam(':fecha_compra', $fecha_compra);
        $stmt->bindParam(':fecha_instalacion', $fecha_instalacion);
        $stmt->bindParam(':fecha_mantenimiento', $fecha_mantenimiento);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Maquina creada con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar: " . $e->getMessage();
    }
}
