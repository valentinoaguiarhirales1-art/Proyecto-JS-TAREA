const changeColorButton = document.querySelector("#change-color");
const colorStatus = document.querySelector("#color-status");

changeColorButton.addEventListener("click", () => {
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue} 42% 88%)`;

  document.documentElement.style.setProperty("--page-bg", color);
  colorStatus.textContent = `Nuevo color de fondo: ${color}`;
});
