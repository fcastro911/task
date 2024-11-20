document.getElementById("exportar-pdf-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF esté cargado
    const doc = new jsPDF();

    // Obtener valores del formulario
    const maquinaSelect = document.getElementById("maquina");
    const solicitudSelect = document.getElementById("solicitud");
    const maquina = maquinaSelect.options[maquinaSelect.selectedIndex]?.text || "";
    const solicitud = solicitudSelect.options[solicitudSelect.selectedIndex]?.text || "";
    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaInforme = document.getElementById("fecha_informe").value;

    // Validar que todos los campos estén llenos
    if (!maquina || !solicitud || !descripcion || !fechaInforme) {
        alert("Por favor, completa todos los campos antes de exportar el PDF.");
        return;
    }

    // Configurar el contenido del PDF
    doc.text("Registro de Informe", 10, 10);
    doc.text(`Máquina: ${maquina}`, 10, 20);
    doc.text(`Solicitud: ${solicitud}`, 10, 30);
    doc.text(`Descripción: ${descripcion}`, 10, 40);
    doc.text(`Fecha del Informe: ${fechaInforme}`, 10, 50);

    // Descargar el PDF
    doc.save("informe.pdf");
});
