// Nombre de la base de datos y versión
const dbName = "miBaseDeDatos";
const dbVersion = 1;

// Función para abrir o crear la base de datos
function crearBaseDeDatos() {
  if (!window.indexedDB) {
    console.log("Tu navegador no soporta IndexedDB.");
    return;
  }

  // Intentar abrir la base de datos
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.log("Error al abrir la base de datos:", event);
  };

  request.onsuccess = (event) => {
    console.log("Base de datos abierta con éxito.");
    let db = event.target.result;

    // Verificar si existe algún usuario en la base de datos
    let transaction = db.transaction("Usuario", "readonly");
    let usuarioStore = transaction.objectStore("Usuario");
    let countRequest = usuarioStore.count();

    countRequest.onsuccess = function () {
      if (countRequest.result === 0) {
        // Si no hay usuarios, agregar usuarios y tipos de usuario
        agregarUsuariosYTipos(db);
      }
    };
  };

  request.onupgradeneeded = (event) => {
    let db = event.target.result;

    // Creación de Tablas
    if (!db.objectStoreNames.contains("Usuario")) {
      let usuarioStore = db.createObjectStore("Usuario", { keyPath: "id_usuario", autoIncrement: true });
      usuarioStore.createIndex("nombre_usuario", "nombre_usuario", { unique: false });
      usuarioStore.createIndex("codigo_sucursal", "codigo_sucursal", { unique: false });
      usuarioStore.createIndex("codigo_tipo_usuario", "codigo_tipo_usuario", { unique: false });
    }

    if (!db.objectStoreNames.contains("TipoUsuario")) {
      let tipoUsuarioStore = db.createObjectStore("TipoUsuario", { keyPath: "codigo_tipo_usuario", autoIncrement: true });
      tipoUsuarioStore.createIndex("nombre_tipo_usuario", "nombre_tipo_usuario", { unique: true });
    }

    if (!db.objectStoreNames.contains("Sucursal")) {
      let sucursalStore = db.createObjectStore("Sucursal", { keyPath: "codigo_sucursal", autoIncrement: true });
      sucursalStore.createIndex("nombre_sucursal", "nombre_sucursal", { unique: true });
    }

    if (!db.objectStoreNames.contains("Informe")) {
      // Crear el almacén con clave primaria autoincremental
      let informeStore = db.createObjectStore("Informe", {
        keyPath: "codigo_informe", // Clave primaria con autoIncrement
        autoIncrement: true,
      });
    
      // Crear índices para los campos adicionales
      informeStore.createIndex("marca", "marca", { unique: false });
      informeStore.createIndex("modelo", "modelo", { unique: false });
      informeStore.createIndex("descripcion", "descripcion", { unique: false });
      informeStore.createIndex("fecha_informe", "fecha_informe", { unique: false });
    }
    
    if (!db.objectStoreNames.contains("Solicitud")) {
      let solicitudStore = db.createObjectStore("Solicitud", { keyPath: "codigo_solicitud", autoIncrement: true });
      solicitudStore.createIndex("codigo_maquinaria", "codigo_maquinaria", { unique: false });
      solicitudStore.createIndex("id_usuario", "id_usuario", { unique: false });
      solicitudStore.createIndex("descripcion", "descripcion", { unique: false });
      solicitudStore.createIndex("codigo_estado", "codigo_estado", { unique: false });
    }

    if (!db.objectStoreNames.contains("Estado")) {
      let estadoStore = db.createObjectStore("Estado", { keyPath: "codigo_estado", autoIncrement: true });
      estadoStore.createIndex("nombre_estado", "nombre_estado", { unique: true });
    }

    if (!db.objectStoreNames.contains("Maquina")) {
      let maquinaStore = db.createObjectStore("Maquina", { keyPath: "codigo_maquinaria", autoIncrement: true });
      maquinaStore.createIndex("codigo_sucursal", "codigo_sucursal", { unique: false });
      maquinaStore.createIndex("modelo", "modelo", { unique: false });
      maquinaStore.createIndex("marca", "marca", { unique: false });
      maquinaStore.createIndex("fecha_compra", "fecha_compra", { unique: false });
      maquinaStore.createIndex("fecha_instalacion", "fecha_instalacion", { unique: false });
      maquinaStore.createIndex("fecha_ultima_mantenimiento", "fecha_ultima_mantenimiento", { unique: false });
    }

    console.log("Estructura de base de datos creada con éxito.");
  };
}

// Función para agregar los tipos de usuario y los usuarios iniciales
function agregarUsuariosYTipos(db) {
  let transaction = db.transaction(["Usuario", "TipoUsuario"], "readwrite");
  let tipoUsuarioStore = transaction.objectStore("TipoUsuario");

  // Insertar tipos de usuario
  let adminRequest = tipoUsuarioStore.add({ nombre_tipo_usuario: "admin" });
  let ingenieroRequest = tipoUsuarioStore.add({ nombre_tipo_usuario: "ingeniero" });
  let encargadoRequest = tipoUsuarioStore.add({ nombre_tipo_usuario: "encargado" });

  adminRequest.onsuccess = function (event) {
    let adminTipoUsuarioId = event.target.result;

    // Insertar usuario administrador
    agregarUsuario(db,"admin", "admin", "admin", "admin", "admin@admin.com", "admin", 1, adminTipoUsuarioId);
    console.log("Usuario administrador creado.");
  };

  ingenieroRequest.onsuccess = function (event) {
    let ingenieroTipoUsuarioId = event.target.result;

    // Insertar usuario ingeniero
    agregarUsuario(db,"ingeniero", "ingeniero", "apellido1", "apellido2", "ingeniero@empresa.com", "ingeniero123", 1, ingenieroTipoUsuarioId);
    console.log("Usuario ingeniero creado.");
  };

  encargadoRequest.onsuccess = function (event) {
    let encargadoTipoUsuarioId = event.target.result;

    // Insertar usuario encargado
    agregarUsuario(db, "encargado","encargado", "apellido1", "apellido2", "encargado@empresa.com", "encargado123", 1, encargadoTipoUsuarioId);
    console.log("Usuario encargado creado.");
  };

  adminRequest.onerror = function (event) {
    console.log("Error al crear el tipo de usuario admin:", event);
  };

  ingenieroRequest.onerror = function (event) {
    console.log("Error al crear el tipo de usuario ingeniero:", event);
  };

  encargadoRequest.onerror = function (event) {
    console.log("Error al crear el tipo de usuario encargado:", event);
  };
}

// Función para agregar un usuario
function agregarUsuario(db, nombre_usuario, nombre, apellidoPaterno, apellidoMaterno, correo, contrasena, codigoSucursal, codigoTipoUsuario) {
  let transaction = db.transaction("Usuario", "readwrite");
  let usuarioStore = transaction.objectStore("Usuario");

  usuarioStore.add({
    nombre_usuario: nombre_usuario,
    nombre: nombre,
    apellido_paterno: apellidoPaterno,
    apellido_materno: apellidoMaterno,
    correo_electronico: correo,
    contrasena: contrasena,
    codigo_sucursal: codigoSucursal,
    codigo_tipo_usuario: codigoTipoUsuario,
  });
}

// Ejecutar la función cuando se cargue la página
window.onload = function () {
  crearBaseDeDatos();
};
