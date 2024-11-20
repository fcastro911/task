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
function verificarCredenciales(db, nombreUsuario, password) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["Usuario"], "readonly");
    const usuarioStore = transaction.objectStore("Usuario");

    // Crear índice para buscar por nombre de usuario
    const index = usuarioStore.index("nombre_usuario");
    const request = index.get(nombreUsuario);

    request.onsuccess = (event) => {
      const usuario = event.target.result;
      if (usuario) {
        if (usuario.contrasena === password) {
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

      // Guardar el tipo de usuario en el localStorage
      localStorage.setItem("tipoUsuario", usuario.codigo_tipo_usuario);

      // Redirigir al dashboard
      window.location.href = "/dashboard.html";  // Verifica que la ruta esté correcta
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.log("Error durante el inicio de sesión", error);
  }
});
