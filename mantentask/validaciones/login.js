document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita el envío del formulario al servidor

      // Obtener los valores del formulario
      const nombreUsuario = document.getElementById('nombre_usuario').value.trim();
      const password = document.getElementById('password').value.trim();

      // Recuperar usuarios del localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      console.log("Usuarios registrados:", usuarios);

      // Verificar si el usuario y contraseña coinciden
      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.nombre_usuario === nombreUsuario && usuario.password === password
      );

      if (usuarioEncontrado) {
        alert(`Bienvenido, ${usuarioEncontrado.nombre}!`);
        window.location.href = "dashboard.html"; // Redirige al dashboard
      } else {
        alert("Usuario o contraseña incorrectos. Por favor, verifica tus datos.");
      }
    });
  });

