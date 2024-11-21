<?php
include('../php/bd.php');

// Verificar que se pase un ID válido en la URL
if (isset($_GET['id'])) {
  $id_informe = $_GET['id'];

  // Consultar los datos del informe a editar
  $sql = "SELECT informe.ID, informe.ID_Solicitud, informe.Descripcion, informe.Fecha_Informe, solicitud.ID_Maquina FROM informe LEFT JOIN solicitud ON informe.ID_Solicitud = solicitud.ID WHERE informe.ID = ?";
  $stmt = $conn2->prepare($sql);
  $stmt->bind_param("i", $id_informe);
  $stmt->execute();
  $resultado = $stmt->get_result();

  // Verificar si se encontró el informe
  if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $id_solicitud = $fila['ID_Solicitud'];
    $descripcion = $fila['Descripcion'];
    $fecha_informe = $fila['Fecha_Informe'];
    $id_maquina = $fila['ID_Maquina'];
  } else {
    echo "Informe no encontrado.";
    exit;
  }
} else {
  echo "ID no proporcionado.";
  exit;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar Informe</title>
</head>

<body>
  <h1>Editar Informe</h1>
  <form action="../php/actualizar_informe.php" method="POST">
    <input type="hidden" name="id_informe" value="<?php echo htmlspecialchars($id_informe); ?>">

    <label for="maquina">Máquina:</label>
    <select id="maquina" name="maquina" required>
      <option value="1" <?php echo $id_maquina == 1 ? 'selected' : ''; ?>>esmeril</option>
      <option value="2" <?php echo $id_maquina == 2 ? 'selected' : ''; ?>>compresor</option>
      <option value="3" <?php echo $id_maquina == 3 ? 'selected' : ''; ?>>taladro</option>
      <!-- Opciones dinámicas basadas en la base de datos -->
    </select><br><br>

    <label for="solicitud">Solicitud:</label>
    <select id="solicitud" name="solicitud" required>
      <option value="1" <?php echo $id_solicitud == 1 ? 'selected' : ''; ?>>a</option>
      <option value="2" <?php echo $id_solicitud == 2 ? 'selected' : ''; ?>>b</option>
      <option value="3" <?php echo $id_solicitud == 3 ? 'selected' : ''; ?>>c</option>
      <!-- Opciones dinámicas basadas en la base de datos -->
    </select><br><br>

    <label for="descripcion">Descripción:</label>
    <textarea id="descripcion" name="descripcion" required><?php echo htmlspecialchars($descripcion); ?></textarea><br><br>

    <label for="fecha_informe">Fecha del Informe:</label>
    <input type="date" id="fecha_informe" name="fecha_informe" value="<?php echo htmlspecialchars($fecha_informe); ?>" required><br><br>

    <button type="submit" id="modificar-btn">Modificar</button>
    <button type="button" id="eliminar-btn" onclick="return confirm('¿Estás seguro de que deseas eliminar este informe?')">Eliminar</button>
    <button type="button" id="exportar-pdf-btn">Exportar a PDF</button>
  </form>

  <script src="/validaciones/inputText.js"></script>
  <script src="/validaciones/textArea.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
  <script src="/app/pdf/pdf.js"></script>
</body>

</html>