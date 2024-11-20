
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

  // Función para registrar un estado
  function registrarEstado(nombreEstado) {
    if (!db) {
      console.error("La base de datos no está inicializada.");
      return;
    }

    const transaction = db.transaction("Estado", "readwrite");
    const estadoStore = transaction.objectStore("Estado");

    const estado = { nombre_estado: nombreEstado };

    const request = estadoStore.add(estado);

    request.onsuccess = () => {
      console.log(`Estado "${nombreEstado}" registrado con éxito.`);
      alert(`Estado "${nombreEstado}" registrado con éxito.`);
    };

    request.onerror = (event) => {
      console.error("Error al registrar el estado:", event);
      alert("No se pudo registrar el estado. Verifica los datos ingresados.");
    };
  }

  // Función para manejar el evento de envío del formulario
  document.getElementById("registrar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const nombreEstado = document.getElementById("nombre_estado").value.trim();

    if (nombreEstado === "") {
      alert("El nombre del estado no puede estar vacío.");
      return;
    }

    registrarEstado(nombreEstado);
  });

  // Abrir la base de datos al cargar la página
  window.onload = abrirBaseDeDatos;

