// Configuración de la base de datos
  const dbName = "miBaseDeDatos";
  const dbVersion = 1;
  let db;

  // Función para abrir la base de datos
  function abrirBaseDeDatos() {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Base de datos abierta con éxito.");
    };

    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", event);
    };
  }

  // Función para registrar una máquina
  function registrarMaquina(datosMaquina) {
    if (!db) {
      console.error("La base de datos no está inicializada.");
      return;
    }

    const transaction = db.transaction("Maquina", "readwrite");
    const maquinaStore = transaction.objectStore("Maquina");

    const request = maquinaStore.add(datosMaquina);

    request.onsuccess = () => {
      console.log("Máquina registrada con éxito:", datosMaquina);
      alert("Máquina registrada con éxito.");
    };

    request.onerror = (event) => {
      console.error("Error al registrar la máquina:", event);
      alert("No se pudo registrar la máquina. Verifica los datos ingresados.");
    };
  }

  // Función para manejar el evento de envío del formulario
  document.getElementById("registrar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Capturar los valores del formulario
    const sucursal = document.getElementById("sucursal").value;
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const fechaCompra = document.getElementById("fecha_compra").value;
    const fechaInstalacion = document.getElementById("fecha_instalacion").value;
    const fechaMantenimiento = document.getElementById("fecha_mantenimiento").value;

    // Validar los datos
    if (!marca || !modelo || !fechaCompra || !fechaInstalacion || !fechaMantenimiento) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear objeto con los datos de la máquina
    const datosMaquina = {
      codigo_sucursal: parseInt(sucursal),
      marca,
      modelo,
      fecha_compra: fechaCompra,
      fecha_instalacion: fechaInstalacion,
      fecha_ultima_mantenimiento: fechaMantenimiento,
    };

    // Registrar la máquina en la base de datos
    registrarMaquina(datosMaquina);
  });

  // Abrir la base de datos al cargar la página
  window.onload = abrirBaseDeDatos;

