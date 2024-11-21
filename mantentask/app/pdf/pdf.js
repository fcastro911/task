document.getElementById("exportar-pdf-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF esté cargado
    const doc = new jsPDF();

    // Obtener los valores del formulario
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaInforme = document.getElementById("fecha_informe").value;

    // Validar que todos los campos estén llenos
    if (!marca || !modelo || !descripcion || !fechaInforme) {
      alert("Por favor, completa todos los campos antes de exportar el PDF.");
      return;
    }

    // Configuración del diseño y formato del PDF
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);  // Título en color azul
    doc.text("Informe MantenTask", 105, 20, null, null, 'center'); // Centrado

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);  // Texto en negro

    // Caja de datos
    doc.setDrawColor(0);  // Color de las líneas (negro)
    doc.setFillColor(230, 230, 255);  // Color de fondo de las celdas (ligero azul)
    doc.rect(10, 30, 190, 10, 'FD'); // Rectángulo para el encabezado de sección

    doc.text("Detalles del Informe", 105, 35, null, null, 'center');

    // Información del informe
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Marca: ${marca}`, 10, 50);
    doc.text(`Modelo: ${modelo}`, 10, 60);
    doc.text(`Descripción:`, 10, 70);
    
    // Agregar la descripción con ajuste de línea
    doc.setFontSize(10);
    doc.text(descripcion, 10, 75, { maxWidth: 180 });

    doc.text(`Fecha del Informe: ${fechaInforme}`, 10, 110);

    // Separador de sección
    doc.setLineWidth(0.5);
    doc.line(10, 115, 200, 115); // Línea de separación

    // Pie de página con detalles adicionales
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);  // Color gris claro
    doc.text(`Informe generado el: ${new Date().toLocaleString()}`, 10, 125);

    // Pedir el nombre del archivo al usuario
    let nombreArchivo = prompt("Ingrese un nombre para el archivo PDF:", "informe000");

    // Si el usuario no ingresa un nombre, se usará el nombre por defecto
    if (!nombreArchivo) {
      nombreArchivo = "informe000"; // Nombre por defecto
    }

    // Descargar el PDF con el nombre proporcionado
    doc.save(`${nombreArchivo}.pdf`);
  });

