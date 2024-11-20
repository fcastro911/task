// Configuración de la base de datos
const dbName = "miBaseDeDatos";
const dbVersion = 1;
let db;

// Abrir la base de datos
function abrirBaseDeDatos() {
  const request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Crear la tabla Maquina si no existe
    if (!db.objectStoreNames.contains("Maquina")) {
      const maquinaStore = db.createObjectStore("Maquina", {
        keyPath: "codigo_maquinaria", // Primary key
        autoIncrement: true,
      });
    }

    // Crear la tabla Solicitud si no existe
    if (!db.objectStoreNames.contains("Solicitud")) {
      const solicitudStore = db.createObjectStore("Solicitud", { keyPath: "id", autoIncrement: true });
      solicitudStore.createIndex("estado", "estado", { unique: false });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Base de datos abierta con éxito.");
    cargarOpcionesMaquina(); // Cargar las opciones del select al abrir la base de datos
  };

  request.onerror = (event) => {
    console.error("Error al abrir la base de datos:", event.target.error);
  };
}

// Función para cargar opciones en el select de máquinas
function cargarOpcionesMaquina() {
  if (!db) {
    console.error("La base de datos no está inicializada.");
    return;
  }

  const transaction = db.transaction("Maquina", "readonly");
  const maquinaStore = transaction.objectStore("Maquina");

  const request = maquinaStore.getAll();

  request.onsuccess = (event) => {
    const maquinas = event.target.result;

    const selectMaquina = document.getElementById("maquina");
    selectMaquina.innerHTML = ""; // Limpiar las opciones existentes

    if (maquinas.length > 0) {
      maquinas.forEach((maquina) => {
        const option = document.createElement("option");
        option.value = maquina.codigo_maquinaria; // Usar codigo_maquinaria como valor
        option.textContent = maquina.marca; // Mostrar la marca
        selectMaquina.appendChild(option);
      });
      console.log("Opciones de máquinas cargadas:", maquinas);
    } else {
      // Mostrar un mensaje si no hay máquinas disponibles
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No existen máquinas en el sistema";
      option.disabled = true;
      option.selected = true;
      selectMaquina.appendChild(option);
      console.log("No existen máquinas en el sistema.");
    }
  };

  request.onerror = (event) => {
    console.error("Error al cargar opciones de máquinas:", event.target.error);
  };
}


// Función para registrar una solicitud
function registrarSolicitud(datosSolicitud) {
  if (!db) {
    console.error("La base de datos no está inicializada.");
    return;
  }

  const transaction = db.transaction("Solicitud", "readwrite");
  const solicitudStore = transaction.objectStore("Solicitud");

  const request = solicitudStore.add(datosSolicitud);

  request.onsuccess = () => {
    console.log("Solicitud registrada con éxito:", datosSolicitud);
    alert("Solicitud registrada con éxito.");
  };

  request.onerror = (event) => {
    console.error("Error al registrar la solicitud:", event.target.error);
    alert("No se pudo registrar la solicitud. Verifica los datos ingresados.");
  };
}

// Manejador del evento de registro
document.getElementById("registrar-btn").addEventListener("click", (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  // Capturar los valores del formulario
  const maquina = document.getElementById("maquina").value;
  const descripcion = document.getElementById("descripcion").value.trim();
  const estado = document.getElementById("estado").value;

  // Validar campos obligatorios
  if (!maquina || !descripcion || !estado) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  // Crear el objeto solicitud
  const datosSolicitud = {
    maquina: parseInt(maquina), // Asegúrate de que sea un número
    descripcion,
    estado: parseInt(estado), // Asegúrate de que el estado sea un número
  };

  // Registrar la solicitud en la base de datos
  registrarSolicitud(datosSolicitud);
});

// Abrir la base de datos al cargar la página
window.onload = abrirBaseDeDatos;
