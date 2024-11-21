<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión</title>
</head>

<body>

    <?php
    require_once 'bd.php';
    session_start();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $response = ['success' => false, 'message' => ''];

        // Obtener y limpiar los datos de entrada
        $username = trim(filter_input(INPUT_POST, 'nombre_usuario', FILTER_SANITIZE_SPECIAL_CHARS));
        $password = $_POST['password'];

        if (empty($username) || empty($password)) {
            $response['message'] = 'Por favor, complete todos los campos.';
            echo json_encode($response);
            exit;
        }

        try {
            // Preparar la consulta
            $stmt = $conn->prepare("SELECT ID, Nombre_Usuario, Contraseña, Tipo_Usuario FROM usuario WHERE Nombre_Usuario = :username LIMIT 1");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                // Verificar la contraseña
                if (password_verify($password, $user['Contraseña'])) {
                    // Credenciales correctas
                    $_SESSION['user_id'] = $user['ID'];
                    $_SESSION['username'] = $user['Nombre_Usuario'];
                    $_SESSION['role'] = $user['Tipo_Usuario'];

                    $response['success'] = true;
                    $response['message'] = 'Inicio de sesión exitoso';

                    // Redirección según el rol
                    $redirects = [
                        '1' => '../dashboard.php',
                        '2' => '../dashboard.php',
                        'default' => '../dashboard.php'
                    ];

                    // Determinar la URL de redirección según el tipo de usuario
                    $redirectUrl = $redirects[$user['Tipo_Usuario']] ?? $redirects['default'];

                    // Redirigir al usuario
                    header("Location: $redirectUrl");
                    exit;
                } else {
                    $response['message'] = 'Contraseña incorrecta.';
                }
            } else {
                $response['message'] = 'Usuario no encontrado.';
            }
        } catch (PDOException $e) {
            $response['message'] = 'Error en el servidor: ' . $e->getMessage();
        }

        // Enviar la respuesta como JSON para manejo en JavaScript
        echo json_encode($response);
        exit;
    }
    ?>

</body>

</html>