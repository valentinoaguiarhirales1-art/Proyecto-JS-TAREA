const paragraphInput = document.querySelector("#paragraph-input");
const wordCount = document.querySelector("#word-count");
const characterCount = document.querySelector("#character-count");

function updateTextCounts() {
  const text = paragraphInput.value;
  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.split(/\s+/u).length : 0;
  const characters = text.replace(/[ \t\r\n]/gu, "").length;

  wordCount.textContent = `Palabras: ${words}`;
  characterCount.textContent = `Caracteres: ${characters}`;
}

paragraphInput.addEventListener("input", updateTextCounts);
updateTextCounts();
