// Script para gestionar IndexedDB
document.addEventListener("DOMContentLoaded", () => {
  let db;

  // Inicializar la base de datos
  function inicializarBaseDeDatos() {
    const request = indexedDB.open("miBaseDeDatos", 1);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains("Informe")) {
        db.createObjectStore("Informe", { keyPath: "id", autoIncrement: false });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Base de datos inicializada.");
    };

    request.onerror = (event) => {
      console.error("Error al inicializar la base de datos:", event.target.error);
    };
  }

  // Función para registrar datos en la base de datos
  function registrarInforme(marca, modelo, descripcion, fechaInforme) {
    const transaction = db.transaction(["Informe"], "readwrite");
    const store = transaction.objectStore("Informe");

    const informe = {
      marca,
      modelo,
      descripcion,
      fechaInforme,
      registradoEn: new Date().toISOString(),
    };

    const request = store.add(informe);

    request.onsuccess = () => {
      console.log("Informe registrado exitosamente.");
      alert("El informe se registró correctamente.");
    };

    request.onerror = (event) => {
      console.error("Error al registrar el informe:", event.target.error);
    };
  }

  // Inicializar la base de datos al cargar la página
  inicializarBaseDeDatos();

  // Escuchar el clic del botón "Registrar"
  const registrarBtn = document.getElementById("registrar-btn");
  registrarBtn.addEventListener("click", () => {
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaInforme = document.getElementById("fecha_informe").value;

    if (marca && modelo && descripcion && fechaInforme) {
      registrarInforme(marca, modelo, descripcion, fechaInforme);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });
});
