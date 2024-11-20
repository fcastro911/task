// Inicializar SortableJS y guardar posiciones
function initializeSortable(id) {
  const container = document.getElementById(id);
  Sortable.create(container, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    filter: "#logoutButton", // Excluir el botón de cerrar sesión
    onEnd: savePositions,
  });
}

// Guardar posiciones en LocalStorage
function savePositions() {
  const navigationButtons = document.getElementById("navigationButtons").children;
  const dataButtons = document.getElementById("dataButtons").children;

  const positions = {
    navigation: Array.from(navigationButtons).map(el => el.dataset.id),
    data: Array.from(dataButtons).map(el => el.dataset.id),
  };

  localStorage.setItem("buttonPositions", JSON.stringify(positions));
}

// Restaurar posiciones desde LocalStorage
function loadPositions() {
  const storedPositions = JSON.parse(localStorage.getItem("buttonPositions"));
  if (!storedPositions) return;

  const navigationButtons = document.getElementById("navigationButtons");
  const dataButtons = document.getElementById("dataButtons");

  const navigationOrder = storedPositions.navigation;
  const dataOrder = storedPositions.data;

  reorderButtons(navigationButtons, navigationOrder);
  reorderButtons(dataButtons, dataOrder);
}

// Reordenar botones en el DOM
function reorderButtons(container, order) {
  const elements = Array.from(container.children);
  order.forEach(id => {
    const element = elements.find(el => el.dataset.id === id);
    if (element) container.appendChild(element);
  });
}

// Cerrar sesión y limpiar LocalStorage
function logout() {
  localStorage.removeItem("buttonPositions");
  window.location.href = "/logout.html";
}

// Eventos de clic en botones
document.querySelectorAll("button[data-url]").forEach(button => {
  button.addEventListener("click", function () {
    const url = this.getAttribute("data-url");
    window.location.href = url;
  });
});

// Inicializar drag-and-drop y cargar posiciones
document.addEventListener("DOMContentLoaded", () => {
  initializeSortable("navigationButtons");
  initializeSortable("dataButtons");
  loadPositions();
});
