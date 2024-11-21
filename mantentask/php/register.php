<?php
require_once 'bd.php'; // Asegúrate de que esta línea apunta al archivo correcto para la conexión a la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = trim($_POST['nombre']);
    $apellido_p = trim($_POST['apellido_paterno']);
    $apellido_m = trim($_POST['apellido_materno']);
    $correo = trim($_POST['email']);
    $sucursal = trim($_POST['sucursal']);

    $username = $_POST['nombre_usuario'];
    $tipo_usuario = $_POST['tipo_usuario'];
    $contrasena = $_POST['password'];
    $confirmarContrasena = $_POST['confirm_password'];
    

    try {

        $hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

        // Consulta SQL para insertar el usuario
        $sql = "INSERT INTO `usuario`(`Nombre`, `Apellido_Paterno`, `Apellido_Materno`, `Correo_Electronico`, `Contraseña`, `ID_Sucursal`, `Nombre_Usuario`, `Tipo_Usuario`) VALUES (:nombre, :apellido_p, :apellido_m, :correo, :password, :id_sucursal, :username,  :tipo_usuario)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido_p', $apellido_p);
        $stmt->bindParam(':apellido_m', $apellido_m);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':id_sucursal', $sucursal);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':tipo_usuario', $tipo_usuario);

        // Ejecutar la consulta
        $stmt->execute();
        echo "Usuario creado con éxito.";
    } catch (PDOException $e) {
        echo "Error al insertar el usuario administrador: " . $e->getMessage();
    }
}
