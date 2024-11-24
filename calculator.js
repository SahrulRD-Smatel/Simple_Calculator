let currentInput = "0";
let previousInput = "";
let operator = null;

function appendValue(value) {
  // Prevent multiple leading zeros and handle decimals properly
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else if (value === "." && currentInput.includes(".")) {
    return; // Prevent multiple decimals
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function operation(op) {
  if (!currentInput) return;

  if (previousInput && operator) {
    calculate(); // Chain calculations if operator is pressed again
  }

  operator = op;
  previousInput = currentInput;
  currentInput = ""; // Prepare for the next input
  updateDisplay();
}

function calculate() {
  if (!previousInput || !currentInput || !operator) return;

  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr !== 0 ? prev / curr : "Error"; // Prevent division by zero
      break;
    case "%":
      result = prev % curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  operator = null;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function toggleSign() {
  if (currentInput === "0") return;

  currentInput = currentInput.startsWith("-")
    ? currentInput.substring(1)
    : `-${currentInput}`;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  
  // Show the full equation if operator is active
  if (operator && previousInput) {
    display.textContent = `${previousInput} ${operator} ${currentInput}`;
  } else {
    display.textContent = currentInput;
  }
}
