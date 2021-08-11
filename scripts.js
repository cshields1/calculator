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
  b === 0 ? alert("Division by zero is forbidden!") : a / b;

let a = null;
let b = null;
let operator = null;
let shouldClearDisplay = false;

window.addEventListener("keydown", getKeyboardInput);
keypadBtns.forEach((button) => button.addEventListener("click", updateDisplay));
signBtn.addEventListener("click", changeSign);
operatorBtns.forEach((button) => button.addEventListener("click", setOperator));
equalsBtn.addEventListener("click", evaluate);
decimalBtn.addEventListener("click", checkDecimal);
backspaceBtn.addEventListener("click", deleteLastNumber);
clearBtn.addEventListener("click", clearAll);

function getKeyboardInput(e) {
  keypadBtns.forEach((button) => {
    if (e.key === button.textContent) {
      this.textContent = e.key;
      updateDisplay();
    }
  });
  operatorBtns.forEach((button) => {
    if (e.key === button.textContent) {
      this.operator = button.operator;
      setOperator(button);
    }
  });
  if ((e.key === "Enter" || e.key === "=") && operator) evaluate();
  if (e.key === "Backspace") deleteLastNumber();
  if (e.key === "Escape") clearAll();
}

function updateDisplay() {
  if (shouldClearDisplay) {
    display.textContent = "";
    checkDecimal();
    shouldClearDisplay = false;
  }
  display.textContent += this.textContent;
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
  if (display.textContent.includes(".")) {
    display.textContent = Number(display.textContent).toPrecision(10);
    while (display.textContent[display.textContent.length - 1] === "0") {
      deleteLastNumber();
    }
  }
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

function deleteLastNumber() {
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

function changeSign() {
  if (!display.textContent.includes("-")) {
    display.textContent = "-" + display.textContent;
  } else {
    display.textContent = display.textContent.slice(1);
  }
}

// TO DO
// - throw an error if user tries to divide by 0 (animate?)
// - differentiate operator and keypad button styles
