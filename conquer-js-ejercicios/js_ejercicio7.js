const passwordForm = document.querySelector("#password-form");
const passwordLengthInput = document.querySelector("#password-length");
const generatedPassword = document.querySelector("#generated-password");
const passwordError = document.querySelector("#password-error");

const characterGroups = [
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "0123456789",
  "!@#$%^&*()-_=+[]{};:,.<>?",
];
const allCharacters = characterGroups.join("");

function randomIndex(maximum) {
  const randomValue = new Uint32Array(1);
  const range = 0x100000000;
  const limit = Math.floor(range / maximum) * maximum;

  do {
    window.crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % maximum;
}

function createPassword(length) {
  const characters = characterGroups.map((group) => group[randomIndex(group.length)]);

  while (characters.length < length) {
    characters.push(allCharacters[randomIndex(allCharacters.length)]);
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }

  return characters.join("");
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const length = passwordLengthInput.valueAsNumber;

  if (!Number.isInteger(length) || length < 4 || length > 128) {
    passwordError.textContent = "La longitud debe ser un número entero entre 4 y 128.";
    generatedPassword.value = "";
    passwordLengthInput.focus();
    return;
  }

  passwordError.textContent = "";
  generatedPassword.value = createPassword(length);
});
