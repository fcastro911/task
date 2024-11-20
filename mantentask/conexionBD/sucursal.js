
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

  // Función para registrar una sucursal
  function registrarSucursal(nombreSucursal) {
    if (!db) {
      console.error("La base de datos no está inicializada.");
      return;
    }

    const transaction = db.transaction("Sucursal", "readwrite");
    const sucursalStore = transaction.objectStore("Sucursal");

    const sucursal = { nombre_sucursal: nombreSucursal };

    const request = sucursalStore.add(sucursal);

    request.onsuccess = () => {
      console.log(`Sucursal "${nombreSucursal}" registrada con éxito.`);
      alert(`Sucursal "${nombreSucursal}" registrada con éxito.`);
    };

    request.onerror = (event) => {
      console.error("Error al registrar la sucursal:", event);
      alert("No se pudo registrar la sucursal. Verifica los datos ingresados.");
    };
  }

  // Función para manejar el evento de envío del formulario
  document.getElementById("registrar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const nombreSucursal = document.getElementById("nombre_sucursal").value.trim();

    if (nombreSucursal === "") {
      alert("El nombre de la sucursal no puede estar vacío.");
      return;
    }

    registrarSucursal(nombreSucursal);
  });

  // Abrir la base de datos al cargar la página
  window.onload = abrirBaseDeDatos;

