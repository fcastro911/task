document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');
  const usernameInput = document.getElementById('nombre_usuario'); // Suponiendo que el input de nombre de usuario tiene este ID
  const form = document.querySelector('form');
  
  // Limitar la longitud de la contraseña a 12 caracteres
  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length > 12) {
      passwordInput.value = passwordInput.value.slice(0, 12);
    }
  });
  
  confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value.length > 12) {
      confirmPasswordInput.value = confirmPasswordInput.value.slice(0, 12);
    }
  });
  
  form.addEventListener('submit', (event) => {
    console.clear();
    console.log("Validando formulario...");
  
    // Eliminar mensajes de error previos si existen
    const mensajePrevio = document.querySelector('p#error-message');
    if (mensajePrevio) {
      mensajePrevio.remove();
    }

    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
  
    // Validar el nombre de usuario
    if (!validarNombreUsuario(usernameValue)) {
      event.preventDefault();
      console.log("Error: Nombre de usuario no válido");
      mostrarMensajeError('El nombre de usuario debe tener entre 2 y 10 caracteres y solo contener caracteres alfanuméricos.', usernameInput);
      return;
    }
  
    // Validar la contraseña antes de enviar el formulario
    if (!validarContrasena(passwordValue)) {
      event.preventDefault();
      console.log("Error: Contraseña no válida");
      mostrarMensajeError('La contraseña debe tener entre 8 y 12 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial.', passwordInput);
      return;
    }
  
    // Validar si las contraseñas coinciden
    if (passwordValue !== confirmPasswordValue) {
      event.preventDefault();
      console.log("Error: Las contraseñas no coinciden");
      mostrarMensajeError('Las contraseñas no coinciden.', confirmPasswordInput);
      return;
    }
  
    console.log("Formulario válido, enviando...");
  
    // Reiniciar el formulario después de un envío exitoso
    form.reset();
  });
  
  function validarContrasena(contrasena) {
    // Expresión regular para validar los requisitos de la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    return regex.test(contrasena);
  }

  function validarNombreUsuario(nombreUsuario) {
    // Expresión regular para verificar que el nombre de usuario tenga entre 2 y 10 caracteres y solo contenga caracteres alfanuméricos
    const regex = /^[a-zA-Z0-9]{2,10}$/;
    return regex.test(nombreUsuario);
  }
  
  function mostrarMensajeError(mensaje, elemento) {
    // Crear mensaje de error directamente en el HTML
    const mensajeError = document.createElement('p');
    mensajeError.id = 'error-message';
    mensajeError.style.color = 'red';
    mensajeError.textContent = mensaje;
    elemento.insertAdjacentElement('afterend', mensajeError);
  }
  
});
