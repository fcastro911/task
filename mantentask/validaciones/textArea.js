document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los elementos textarea con el id 'descripcion' en ambos formularios
    const textareas = document.querySelectorAll("#descripcion");
  
    textareas.forEach((textarea) => {
      // Crear el contador de caracteres y colocarlo debajo del textarea
      const contador = document.createElement("p");
      contador.className = "contador-caracteres";
      contador.style.color = "gray";
      contador.textContent = `0/1000 caracteres`;
      textarea.insertAdjacentElement("afterend", contador);
  
      // Evento para actualizar el contador y validar el contenido en tiempo real
      textarea.addEventListener("input", () => {
        const contenido = textarea.value;
  
        // Actualizar el contador de caracteres
        contador.textContent = `${contenido.length}/1000 caracteres`;
  
        // Validar la longitud del contenido (máximo 1000 caracteres)
        if (contenido.length > 1000) {
          textarea.value = contenido.slice(0, 1000); // Truncar el texto a 1000 caracteres
          contador.textContent = `1000/1000 caracteres`;
          mostrarMensajeError("La descripción no puede tener más de 1000 caracteres.", textarea);
        } else {
          eliminarMensajeError();
        }
      });
    });
  
    // Selecciona todos los formularios en la página
    const forms = document.querySelectorAll("form");
    
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        // Validación y restauración de valores
        textareas.forEach((textarea) => {
          const contenido = textarea.value;
  
          // Validar la longitud al enviar (máximo 1000 caracteres)
          if (contenido.length > 1000) {
            event.preventDefault(); // Evita que se envíe el formulario
            alert("La descripción no puede tener más de 1000 caracteres.");
          }
        });
  
        // Restaurar valores de los campos textarea y select
        restaurarCampos(form);
      });
    });
  
    // Función para mostrar un mensaje de error debajo del textarea
    function mostrarMensajeError(mensaje, elemento) {
      let mensajeError = document.getElementById("error-message");
      if (!mensajeError) {
        mensajeError = document.createElement("p");
        mensajeError.id = "error-message";
        mensajeError.style.color = "red";
        elemento.insertAdjacentElement("afterend", mensajeError);
      }
      mensajeError.textContent = mensaje;
    }
  
    // Función para eliminar el mensaje de error
    function eliminarMensajeError() {
      const mensajeError = document.getElementById("error-message");
      if (mensajeError) {
        mensajeError.remove();
      }
    }
  
    // Función para restaurar los campos del formulario
    function restaurarCampos(form) {
      // Restaurar los campos textarea
      const textareas = form.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
        textarea.value = ''; // Limpiar el contenido del textarea
      });
  
      // Restaurar los campos select
      const selects = form.querySelectorAll('select');
      selects.forEach((select) => {
        select.selectedIndex = 0; // Establecer la opción predeterminada (primer elemento)
      });
    }
  });
  