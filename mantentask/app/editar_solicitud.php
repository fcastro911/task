<?php
// Suponiendo que ya has establecido la conexión con la base de datos
require_once '../php/bd.php';

// Obtener el ID de la solicitud a editar desde la URL
if (isset($_GET['id'])) {
  $id_solicitud = $_GET['id'];

  // Recuperar los datos de la solicitud
  $sql = "SELECT * FROM solicitud WHERE ID = :id";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':id', $id_solicitud);
  $stmt->execute();
  $solicitud = $stmt->fetch(PDO::FETCH_ASSOC);

  // Verificar si se ha encontrado la solicitud
  if (!$solicitud) {
    echo "<div class='alert alert-danger text-center mt-4'>Solicitud no encontrada.</div>";
    exit;
  }
} else {
  echo "<div class='alert alert-danger text-center mt-4'>No se ha proporcionado un ID válido.</div>";
  exit;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar Solicitud</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            <h3>Editar Solicitud</h3>
          </div>
          <div class="card-body">
            <form action="../php/actualizar_solicitud.php" method="POST">
              <!-- Campo oculto con el ID de la solicitud -->
              <input type="hidden" name="id_solicitud" value="<?php echo $solicitud['ID']; ?>">

              <!-- Campo Máquina -->
              <div class="mb-3">
                <label for="maquina" class="form-label">Máquina:</label>
                <select class="form-select" id="maquina" name="maquina" required>
                  <option value="1" <?php echo ($solicitud['ID_Maquina'] == 1) ? 'selected' : ''; ?>>Esmeril</option>
                  <option value="2" <?php echo ($solicitud['ID_Maquina'] == 2) ? 'selected' : ''; ?>>Compresor</option>
                  <option value="3" <?php echo ($solicitud['ID_Maquina'] == 3) ? 'selected' : ''; ?>>Taladro</option>
                </select>
              </div>

              <!-- Campo Descripción -->
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción:</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="4" required><?php echo htmlspecialchars($solicitud['Descripcion']); ?></textarea>
              </div>

              <!-- Campo Estado -->
              <div class="mb-3">
                <label for="estado" class="form-label">Estado:</label>
                <select class="form-select" id="estado" name="estado" required>
                  <option value="1" <?php echo ($solicitud['ID_Estado'] == 1) ? 'selected' : ''; ?>>Urgente</option>
                  <option value="2" <?php echo ($solicitud['ID_Estado'] == 2) ? 'selected' : ''; ?>>Normal</option>
                  <option value="3" <?php echo ($solicitud['ID_Estado'] == 3) ? 'selected' : ''; ?>>Tranquilo</option>
                </select>
              </div>

              <!-- Botón Modificar -->
              <div class="d-grid">
                <button type="submit" id="modificar-btn" class="btn btn-success">Modificar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Scripts de validación -->
  <script src="/validaciones/inputText.js"></script>
  <script src="/validaciones/textArea.js"></script>
</body>

</html>
