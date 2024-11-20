
  // Configuración de la base de datos
  const dbName = "miBaseDeDatos";
  const dbVersion = 1;
  let db;

  // Abrir la base de datos
  function abrirBaseDeDatos() {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains("Usuario")) {
        const usuarioStore = db.createObjectStore("Usuario", { keyPath: "id", autoIncrement: true });
        usuarioStore.createIndex("email", "email", { unique: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Base de datos abierta con éxito.");
    };

    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", event.target.error);
    };
  }

  // Función para registrar un usuario
  function registrarUsuario(datosUsuario) {
    if (!db) {
      console.error("La base de datos no está inicializada.");
      return;
    }

    const transaction = db.transaction("Usuario", "readwrite");
    const usuarioStore = transaction.objectStore("Usuario");

    const request = usuarioStore.add(datosUsuario);

    request.onsuccess = () => {
      console.log("Usuario registrado con éxito:", datosUsuario);
      alert("Usuario registrado con éxito.");
    };

    request.onerror = (event) => {
      console.error("Error al registrar el usuario:", event.target.error);
      if (event.target.error.name === "ConstraintError") {
        alert("El correo electrónico ya está registrado.");
      } else {
        alert("No se pudo registrar el usuario. Verifica los datos ingresados.");
      }
    };
  }

  // Validar contraseñas
  function validarContrasenas(password, confirmPassword) {
    return password === confirmPassword;
  }

  // Manejador del evento de registro
  document.getElementById("registrar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evitar recarga de la página

    // Capturar los valores del formulario
    const nombreUsuario = document.getElementById("nombre_usuario").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidoPaterno = document.getElementById("apellido_paterno").value.trim();
    const apellidoMaterno = document.getElementById("apellido_materno").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const tipoUsuario = document.getElementById("tipo_usuario").value;
    const sucursal = document.getElementById("sucursal").value;

    // Validar contraseñas
    if (!validarContrasenas(password, confirmPassword)) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Validar campos obligatorios
    if (!nombreUsuario || !nombre || !apellidoPaterno || !email || !password) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Crear el objeto usuario
    const datosUsuario = {
      nombre_usuario: nombreUsuario,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      email,
      password, // Nota: En un sistema real, nunca guardes contraseñas en texto plano.
      tipo_usuario: parseInt(tipoUsuario),
      sucursal: parseInt(sucursal),
    };

    // Registrar el usuario en la base de datos
    registrarUsuario(datosUsuario);
  });

  // Abrir la base de datos al cargar la página
  window.onload = abrirBaseDeDatos;

