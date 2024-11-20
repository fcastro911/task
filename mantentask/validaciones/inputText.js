document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    // Selecciona todos los inputs de texto y email del formulario, excepto el campo 'nombre_usuario'
    const inputs = form.querySelectorAll("input[type='text']:not(#nombre_usuario), input[type='email']");

    let valid = true; // Variable para verificar la validez del formulario

    inputs.forEach((input) => {
      // Eliminar espacios al principio y al final, convertir a mayúsculas,
      // y reemplazar múltiples espacios internos por un solo espacio
      input.value = input.value.trim().toUpperCase().replace(/\s+/g, " ");

      // Validar que los inputs tengan entre 2 y 30 caracteres alfanuméricos
      if (input.type === "text") {
        const valor = input.value;

        // Validar que tenga entre 2 y 30 caracteres alfanuméricos
        if (!/^[a-zA-Z0-9\s]{2,30}$/.test(valor)) {
          valid = false;
          alert(`El campo ${input.name || input.id} debe tener entre 2 y 30 caracteres alfanuméricos.`);
        }
      }
    });

    // Si la validación falla, evita que se envíe el formulario
    if (!valid) {
      event.preventDefault();
      return;
    }

    console.log("Formulario transformado y enviado.");

    // Restablecer el formulario después de un envío exitoso
    form.reset();
  });
});
