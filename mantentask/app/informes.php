<?php
include('../php/bd.php');

// Consulta SQL
$sql = "SELECT informe.ID, usuario.Nombre, informe.ID_Solicitud, informe.Descripcion, informe.Fecha_Informe FROM `informe` INNER JOIN usuario ON usuario.ID = informe.ID_Usuario;";
$resultado = $conn2->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de Informes</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 text-primary">Lista de Informes</h1>
      <p class="lead text-muted">Gestione, edite o elimine los informes registrados</p>
    </div>

    <div class="card p-4 shadow-sm">
      <div class="table-responsive">
        <?php if ($resultado && $resultado->num_rows > 0): ?>
          <table class="table table-bordered table-striped">
            <thead class="table-primary text-center">
              <tr>
                <?php
                // Mostrar los encabezados de la tabla
                $columnas = $resultado->fetch_fields();
                foreach ($columnas as $columna) {
                  echo "<th>" . htmlspecialchars($columna->name) . "</th>";
                }
                ?>
                <th>Acciones</th> <!-- Columna para los botones -->
              </tr>
            </thead>
            <tbody>
              <?php
              // Mostrar los datos
              while ($fila = $resultado->fetch_assoc()) {
                echo "<tr>";
                foreach ($fila as $valor) {
                  echo "<td>" . htmlspecialchars($valor) . "</td>";
                }
                // Botones para Editar y Eliminar
                $id_informe = $fila['ID']; // ID del informe
                echo "<td class='text-center'>
                  <a class='btn btn-warning btn-sm mx-1' href='editar_informe.php?id=$id_informe'>Editar</a>
                  <a class='btn btn-danger btn-sm mx-1' href='../php/eliminar_informe.php?id=$id_informe' onclick='return confirm(\"¿Estás seguro de que deseas eliminar este informe?\")'>Eliminar</a>
                </td>";
                echo "</tr>";
              }
              ?>
            </tbody>
          </table>
        <?php else: ?>
          <p class="text-center text-muted">No hay datos disponibles en la tabla.</p>
        <?php endif; ?>
      </div>
      <div class="text-center mt-4">
        <a href="informe copy.html" class="btn btn-primary">Registrar Nuevo Informe</a>
      </div>
    </div>
  </div>
</body>

</html>
