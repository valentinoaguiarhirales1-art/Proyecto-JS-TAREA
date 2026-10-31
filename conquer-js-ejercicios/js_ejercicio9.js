const storageKey = "conquer-js-tasks";
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyTasks = document.querySelector("#empty-tasks");
const taskStatus = document.querySelector("#task-status");
const clearCompletedButton = document.querySelector("#clear-completed");

function loadTasks() {
  try {
    const savedTasks = window.localStorage.getItem(storageKey);

    if (savedTasks === null) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks) || parsedTasks.some((task) =>
      typeof task?.text !== "string" || typeof task?.completed !== "boolean"
    )) {
      throw new Error("El formato de las tareas guardadas no es válido.");
    }

    return parsedTasks;
  } catch (error) {
    console.error("No se pudieron cargar las tareas guardadas.", error);
    taskStatus.textContent = "No se pudieron cargar las tareas guardadas. Puedes crear una lista nueva.";
    taskStatus.classList.add("status-error");
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
    taskStatus.textContent = "";
    taskStatus.classList.remove("status-error");
    return true;
  } catch (error) {
    console.error("No se pudieron guardar las tareas.", error);
    taskStatus.textContent = "No se pudieron guardar los cambios en este navegador.";
    taskStatus.classList.add("status-error");
    return false;
  }
}

function renderTasks() {
  taskList.replaceChildren();

  for (const [index, task] of tasks.entries()) {
    const item = document.createElement("li");
    item.className = "list-item";

    const content = document.createElement("div");
    content.className = "list-item-content";

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Marcar como ${task.completed ? "pendiente" : "completada"}: ${task.text}`);

    const label = document.createElement("span");
    label.className = "list-item-text";
    label.textContent = task.text;
    label.classList.toggle("task-completed", task.completed);

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    content.append(checkbox, label);

    const removeButton = document.createElement("button");
    removeButton.className = "button button-danger";
    removeButton.type = "button";
    removeButton.textContent = "Eliminar";
    removeButton.setAttribute("aria-label", `Eliminar ${task.text}`);
    removeButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    item.append(content, removeButton);
    taskList.append(item);
  }

  emptyTasks.hidden = tasks.length > 0;
  clearCompletedButton.disabled = !tasks.some((task) => task.completed);
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    taskStatus.textContent = "Escribe una tarea antes de agregarla.";
    taskStatus.classList.add("status-error");
    taskInput.focus();
    return;
  }

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
  taskInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
