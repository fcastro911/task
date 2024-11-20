document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        console.clear();
        console.log("Validando formulario...");

        // Obtener todos los campos de tipo date
        const dateInputs = form.querySelectorAll('input[type="date"]');
        let isValid = true; // Bandera para controlar si todos los campos son válidos

        // Iterar sobre cada campo de tipo date
        dateInputs.forEach(input => {
            const dateValue = input.value;

            if (!dateValue) {
                console.error(`El campo ${input.name} es obligatorio.`);
                isValid = false; // Marcar como no válido si algún campo está vacío
            } else {
                // Convertir la fecha a formato aaaa-mm-dd
                const date = new Date(dateValue);
                const formattedDate = date.toISOString().split('T')[0]; // El formato es aaaa-mm-dd

                // Asignar el valor formateado al campo de tipo date
                input.value = formattedDate;
            }
        });

        if (!isValid) {
            event.preventDefault(); // Evitar que el formulario se envíe
            alert("Por favor, completa todos los campos de fecha.");
            console.log("Formulario no válido, revisa los campos obligatorios.");
        } else {
            console.log("Formulario válido, enviando...");
        }
    });
});
