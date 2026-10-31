const firstNumberInput = document.querySelector("#first-number");
const secondNumberInput = document.querySelector("#second-number");
const calculationResult = document.querySelector("#calculation-result");
const calculatorError = document.querySelector("#calculator-error");
const operationButtons = document.querySelectorAll("[data-operation]");

const operations = {
  add: (first, second) => first + second,
  subtract: (first, second) => first - second,
  multiply: (first, second) => first * second,
  divide: (first, second) => first / second,
};

function calculate(operationName) {
  const firstValue = firstNumberInput.value.trim();
  const secondValue = secondNumberInput.value.trim();

  if (!firstValue || !secondValue) {
    calculatorError.textContent = "Completa ambos campos con números válidos.";
    calculationResult.textContent = "";
    return;
  }

  const first = firstNumberInput.valueAsNumber;
  const second = secondNumberInput.valueAsNumber;

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    calculatorError.textContent = "Introduce dos números válidos.";
    calculationResult.textContent = "";
    return;
  }

  if (operationName === "divide" && second === 0) {
    calculatorError.textContent = "No se puede dividir entre cero.";
    calculationResult.textContent = "";
    return;
  }

  const result = operations[operationName](first, second);

  if (!Number.isFinite(result)) {
    calculatorError.textContent = "El resultado no es un número finito.";
    calculationResult.textContent = "";
    return;
  }

  calculatorError.textContent = "";
  calculationResult.textContent = `Resultado: ${result}`;
}

for (const button of operationButtons) {
  button.addEventListener("click", () => calculate(button.dataset.operation));
}
