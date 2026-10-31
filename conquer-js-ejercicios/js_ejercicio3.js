const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const emptyList = document.querySelector("#empty-list");
const listStatus = document.querySelector("#list-status");

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = itemInput.value.trim();

  if (!text) {
    listStatus.textContent = "Escribe un elemento antes de agregarlo.";
    listStatus.classList.add("status-error");
    itemInput.focus();
    return;
  }

  const item = document.createElement("li");
  item.className = "list-item";

  const itemText = document.createElement("span");
  itemText.className = "list-item-text";
  itemText.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.className = "button button-danger";
  removeButton.type = "button";
  removeButton.textContent = "Eliminar";
  removeButton.setAttribute("aria-label", `Eliminar ${text}`);
  removeButton.addEventListener("click", () => {
    item.remove();
    emptyList.hidden = itemList.children.length > 0;
  });

  item.append(itemText, removeButton);
  itemList.append(item);
  emptyList.hidden = true;
  listStatus.textContent = "";
  listStatus.classList.remove("status-error");
  itemForm.reset();
  itemInput.focus();
});
