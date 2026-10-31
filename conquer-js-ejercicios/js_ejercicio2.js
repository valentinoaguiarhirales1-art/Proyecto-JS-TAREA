const countClicksButton = document.querySelector("#count-clicks");
const clickCount = document.querySelector("#click-count");
let clicks = 0;

countClicksButton.addEventListener("click", () => {
  clicks += 1;
  clickCount.textContent = `Clics: ${clicks}`;
});
