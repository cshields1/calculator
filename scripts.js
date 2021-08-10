const keypadBtns = document.querySelectorAll(".keypad");
const decimalBtn = document.querySelector("#decimal");
const operatorBtns = document.querySelectorAll(".operator");
const signBtn = document.querySelector("#sign");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const equalsBtn = document.querySelector("#equals");
const backspaceBtn = document.querySelector("#backspace");
const clearBtn = document.querySelector("#clear");

const display = document.querySelector("#display");
display.textContent = "";

addBtn.operator = (a, b) => a + b;
subtractBtn.operator = (a, b) => a - b;
multiplyBtn.operator = (a, b) => a * b;
divideBtn.operator = (a, b) =>
  b === 0 ? "Division by zero is forbidden!" : a / b;

let a = null;
let b = null;
let operator = null;
let shouldClearDisplay = false;

keypadBtns.forEach((button) => {
  button.value = button.textContent;
  button.addEventListener("click", updateDisplay);
});
signBtn.addEventListener("click", changeSign);
operatorBtns.forEach((button) => button.addEventListener("click", setOperator));
equalsBtn.addEventListener("click", evaluate);
decimalBtn.addEventListener("click", checkDecimal);
backspaceBtn.addEventListener("click", deleteNumber);
clearBtn.addEventListener("click", clearAll);

function updateDisplay() {
  if (shouldClearDisplay) {
    display.textContent = "";
    checkDecimal();
    shouldClearDisplay = false;
  }
  display.textContent += this.value;
}

function changeSign() {
  if (!display.textContent.includes("-")) {
    display.textContent = "-" + display.textContent;
  } else {
    display.textContent = display.textContent.slice(1);
  }
}

function setOperator() {
  if (operator) evaluate();
  a = Number(display.textContent) || 0;
  operator = this.operator;
  shouldClearDisplay = true;
}

function evaluate() {
  b = Number(display.textContent) || 0;
  display.textContent = operator(a, b);
  a = Number(display.textContent);
  b = null;
  operator = null;
  checkDecimal();
  shouldClearDisplay = true;
}

function checkDecimal() {
  if (display.textContent.includes(".")) {
    decimalBtn.setAttribute("disabled", "");
  } else {
    decimalBtn.removeAttribute("disabled");
  }
}

function deleteNumber() {
  display.textContent = display.textContent.slice(
    0,
    display.textContent.length - 1
  );
}

function clearAll() {
  a = null;
  b = null;
  operator = null;
  display.textContent = "";
  shouldClearDisplay = false;
  checkDecimal();
}

// evaluate only one pair of digits at a time

// round answers with long decimals

// throw an error if user tries to divide by 0
// - animate?

// differentiate operator and keypad buttons

// keyboard support
