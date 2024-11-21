document.getElementById("exportar-pdf-btn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF esté cargado
  const doc = new jsPDF();

  // Obtener los valores del formulario
  const maquina = document.getElementById("maquina").value.trim();
  const solicitud = document.getElementById("solicitud").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const fechaInforme = document.getElementById("fecha_informe").value;

  // Validar que todos los campos estén llenos
  if (!maquina || !solicitud || !descripcion || !fechaInforme) {
      alert("Por favor, completa todos los campos antes de exportar el PDF.");
      return;
  }

  // Configuración del diseño y formato del PDF
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 255); // Título en color azul
  doc.text("Informe MantenTask", 105, 20, null, null, 'center'); // Centrado

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Texto en negro

  // Información del informe
  doc.text(`Máquina: ${maquina}`, 10, 40);
  doc.text(`Solicitud: ${solicitud}`, 10, 50);
  doc.text(`Descripción:`, 10, 60);

  // Agregar la descripción con ajuste de línea
  doc.setFontSize(10);
  doc.text(descripcion, 10, 65, { maxWidth: 180 });

  doc.text(`Fecha del Informe: ${fechaInforme}`, 10, 90);

  // Separador de sección
  doc.setLineWidth(0.5);
  doc.line(10, 95, 200, 95); // Línea de separación

  // Pie de página con detalles adicionales
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150); // Color gris claro
  doc.text(`Informe generado el: ${new Date().toLocaleString()}`, 10, 105);

  // Pedir el nombre del archivo al usuario
  let nombreArchivo = prompt("Ingrese un nombre para el archivo PDF:", "informe000");

  // Si el usuario no ingresa un nombre, se usará el nombre por defecto
  if (!nombreArchivo) {
      nombreArchivo = "informe000"; // Nombre por defecto
  }

  // Descargar el PDF con el nombre proporcionado
  doc.save(`${nombreArchivo}.pdf`);
});
