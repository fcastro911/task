// Nombre de la base de datos
const dbName = "miBaseDeDatos";
const dbVersion = 1;

// Función para abrir la base de datos
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.log("Error al abrir la base de datos", event);
      reject("Error al abrir la base de datos");
    };

    request.onsuccess = (event) => {
      resolve(event.target.result); // Resolvemos el resultado de la base de datos abierta
    };
  });
}

// Función para verificar usuario y contraseña
function verificarCredenciales(db, nombreUsuario, contrasena) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["Usuario"], "readonly");
    const usuarioStore = transaction.objectStore("Usuario");

    // Crear índice para buscar por nombre de usuario
    const index = usuarioStore.index("nombre_usuario");
    const request = index.get(nombreUsuario);

    request.onsuccess = (event) => {
      const usuario = event.target.result;
      if (usuario) {
        if (usuario.contrasena === contrasena) {
          resolve(usuario); // Credenciales correctas, devolver el usuario
        } else {
          resolve(false); // Contraseña incorrecta
        }
      } else {
        resolve(false); // Usuario no encontrado
      }
    };

    request.onerror = (event) => {
      console.log("Error al verificar credenciales", event);
      reject("Error al verificar credenciales");
    };
  });
}

// Evento de submit del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  const nombreUsuario = document.getElementById("nombre_usuario").value;
  const password = document.getElementById("password").value;

  // Abrir la base de datos
  try {
    const db = await openDatabase();

    // Verificar las credenciales del usuario
    const usuario = await verificarCredenciales(db, nombreUsuario, password);
    if (usuario) {
      alert("Inicio de sesión exitoso");

      // Guardar el token o variable en localStorage que indica que el usuario está autenticado
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("tipoUsuario", usuario.codigo_tipo_usuario);

      // Redirigir según el tipo de usuario
      if (usuario.codigo_tipo_usuario === 1) {
        // Usuario administrador
        window.location.href = "/admin.html";
      } else if (usuario.codigo_tipo_usuario === 2) {
        // Usuario ingeniero
        window.location.href = "/ingeniero.html";
      } else if (usuario.codigo_tipo_usuario === 3) {
        // Usuario encargado
        window.location.href = "/encargado.html";
      } else {
        alert("Tipo de usuario no reconocido");
      }
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.log("Error durante el inicio de sesión", error);
  }
});

