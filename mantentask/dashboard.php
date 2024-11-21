<?php include('./php/bd.php'); ?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>
<style>
  a {
    text-decoration: none;
    color: white;
  }
</style>

<body class="bg-light">
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 text-primary">Dashboard</h1>
      <p class="lead text-muted">Seleccione una opción para continuar:</p>
    </div>

    <!-- Botones de Navegación -->
    <?php if (in_array($_SESSION['role'], ["1", "2"])): ?>
      <div class="row g-4" id="navigationButtons">
        <div class="col-12 col-md-6 draggable">

          <a class="btn btn-primary w-100" href="./app/informe copy.html">Crear Informe</a>

        </div>
        <div class="col-12 col-md-6 draggable">

          <a class="btn btn-secondary w-100" href="./app/informes.php">Ver Informes</a>

        </div>

      <?php endif; ?>

      <?php if (in_array($_SESSION['role'], ["1", "2", "3"])): ?>
        <div class="col-12 col-md-6 draggable">

          <a class="btn btn-success w-100" href="./app/solicitud.html">Crear Solicitud</a>

        </div>
        <div class="col-12 col-md-6 draggable">
          <a class="btn btn-warning w-100" href="./app/solicitudes.php">Consultar Solicitudes</a>
        </div>
      </div>
    <?php endif; ?>
    <!-- Sección de Ingreso de Datos -->
    <?php if ($_SESSION['role'] === "1"): ?>
      <div class="text-center my-5">
        <h3 class="text-primary">Ingreso de Datos</h3>
      </div>
      <div class="row g-4" id="dataButtons">
        <div class="col-12 col-md-6 col-lg-4 draggable">
          <a class="btn btn-outline-primary w-100" href="./admin/sucursal copy.html">Sucursal</a>
        </div>
        <div class="col-12 col-md-6 col-lg-4 draggable">
          <a class="btn btn-outline-primary w-100" href="./admin/maquina.html">Máquina</a>
        </div>
        <div class="col-12 col-md-6 col-lg-4 draggable">

          <a class="btn btn-outline-primary w-100" href="./admin/registro.html">Registro de usuario</a>

        </div>
        <div class="col-12 col-md-6 col-lg-4 draggable">

          <a class="btn btn-outline-primary w-100" href="./admin/estado.html">Estado</a>
        </div>

      </div>
    <?php endif; ?>
    <!-- Opciones de Sesión -->
    <div class="text-center my-5">
      <h3 class="text-danger">Opciones de Sesión</h3>
        <a class="btn btn-danger mt-3" href="./php/logout.php">Cerrar Sesión</a>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- SortableJS -->
  <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
  <script src="/interaccion/dashboard.js?v=1"></script>


  <style>
    /* Estilo del elemento arrastrado */
    .sortable-ghost {
      opacity: 0.5;
      background-color: #f8f9fa;
      border: 2px dashed #007bff;
    }
  </style>
</body>

</html>