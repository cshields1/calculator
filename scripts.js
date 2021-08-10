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
  button.addEventListener("click", function () {
    if (shouldClearDisplay) {
      display.textContent = "";
      shouldClearDisplay = false;
    }
    display.textContent += this.value;
  });
});

signBtn.addEventListener("click", () => {
  if (!display.textContent.includes("-")) {
    display.textContent = "-" + display.textContent;
  } else {
    display.textContent = display.textContent.slice(1);
  }
});

operatorBtns.forEach((button) =>
  button.addEventListener("click", function () {
    if (operator) evaluate();
    a = Number(display.textContent) || 0;
    operator = this.operator;
    shouldClearDisplay = true;
  })
);

equalsBtn.addEventListener("click", evaluate);

decimalBtn.addEventListener("click", () =>
  decimalBtn.setAttribute("disabled", "")
);

backspaceBtn.addEventListener(
  "click",
  () =>
    (display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    ))
);

clearBtn.addEventListener("click", () => {
  a = null;
  b = null;
  operator = null;
  display.textContent = "";
  shouldClearDisplay = false;
  decimalBtn.removeAttribute("disabled");
});

function evaluate() {
  if (!display.textContent.includes("."))
    decimalBtn.removeAttribute("disabled");
  b = Number(display.textContent) || 0;
  display.textContent = operator(a, b);
  a = Number(display.textContent);
  b = null;
  shouldClearDisplay = true;
}

// evaluate only one pair of digits at a time

// round answers with long decimals

// throw an error if user tries to divide by 0
// - animate?

// differentiate operator and keypad buttons

// keyboard support
