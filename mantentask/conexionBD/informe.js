// Función para abrir IndexedDB
function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('miBaseDeDatos', 1);
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos', event);
        reject(event);
      };
  
      // Crear la base de datos si no existe
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
  
        // Crear objeto "Maquina" si no existe
        if (!db.objectStoreNames.contains('Maquina')) {
          const store = db.createObjectStore('Maquina', { keyPath: 'id', autoIncrement: true });
          store.createIndex('nombre', 'nombre', { unique: false });
        }
  
        // Crear objeto "Informe" si no existe
        if (!db.objectStoreNames.contains('Informe')) {
          const storeInforme = db.createObjectStore('Informe', { keyPath: 'id', autoIncrement: true });
          storeInforme.createIndex('fecha_informe', 'fecha_informe', { unique: false });
        }
      };
    });
  }
  
  // Función para cargar las máquinas en el select
  async function cargarMaquinas() {
    try {
      const db = await abrirBaseDatos();
      const transaction = db.transaction('Maquina', 'readonly');
      const store = transaction.objectStore('Maquina');
      const maquinas = store.getAll(); // Obtener todas las máquinas
  
      maquinas.onsuccess = () => {
        const selectMaquina = document.getElementById('maquina');
        const maquinasData = maquinas.result;
  
        // Comprobar si hay máquinas en la base de datos
        if (maquinasData.length > 0) {
          // Limpiar las opciones anteriores
          selectMaquina.innerHTML = '';
  
          // Agregar un elemento de "Seleccione una máquina" por defecto
          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = 'Seleccione una máquina';
          selectMaquina.appendChild(defaultOption);
  
          // Llenar el select con las máquinas de la base de datos
          maquinasData.forEach((maquina) => {
            const option = document.createElement('option');
            option.value = maquina.id; // ID de la máquina
            option.textContent = maquina.nombre; // Nombre de la máquina
            selectMaquina.appendChild(option);
          });
        } else {
          alert('No se han encontrado máquinas en la base de datos');
        }
      };
  
      maquinas.onerror = () => {
        console.error('Error al obtener las máquinas');
      };
    } catch (error) {
      console.error('Error al abrir la base de datos:', error);
    }
  }
  
  // Función para registrar un informe
  async function registrarInforme() {
    try {
      const db = await abrirBaseDatos();
      const transaction = db.transaction('Informe', 'readwrite');
      const store = transaction.objectStore('Informe');
  
      // Obtener los datos del formulario
      const maquina = document.getElementById('maquina').value;
      const descripcion = document.getElementById('descripcion').value;
      const fechaInforme = document.getElementById('fecha_informe').value || new Date().toISOString().split('T')[0]; // Fecha actual si no se proporciona
  
      if (!maquina) {
        alert('Por favor, seleccione una máquina.');
        return;
      }
  
      // Crear el objeto del informe
      const informe = {
        maquina_id: maquina,
        descripcion: descripcion,
        fecha_informe: fechaInforme,
      };
  
      // Guardar el informe en IndexedDB
      const request = store.add(informe);
  
      request.onsuccess = () => {
        alert('Informe registrado exitosamente');
        document.getElementById('formInforme').reset(); // Limpiar el formulario
      };
  
      request.onerror = (event) => {
        console.error('Error al registrar el informe', event);
        alert('Hubo un error al registrar el informe');
      };
    } catch (error) {
      console.error('Error al abrir la base de datos para registrar el informe:', error);
    }
  }
  
  // Función que inicializa la página
  function inicializar() {
    // Cargar las opciones de las máquinas
    cargarMaquinas();
  
    // Establecer la fecha actual por defecto en el campo "fecha_informe"
    const fechaHoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha_informe').value = fechaHoy;
  
    // Asignar el evento para registrar el informe
    document.getElementById('registrar-btn').addEventListener('click', registrarInforme);
  }
  
  // Inicializar la página
  inicializar();
  