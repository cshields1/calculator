const btn1 = document.querySelector("#one");
const btn2 = document.querySelector("#two");
const btn3 = document.querySelector("#three");
const btn4 = document.querySelector("#four");
const btn5 = document.querySelector("#five");
const btn6 = document.querySelector("#six");
const btn7 = document.querySelector("#seven");
const btn8 = document.querySelector("#eight");
const btn9 = document.querySelector("#nine");
const btn0 = document.querySelector("#zero");
const btnDecimal = document.querySelector("#decimal");
const btnSign = document.querySelector("#sign");

const btnAdd = document.querySelector("#add");
const btnSubtract = document.querySelector("#subtract");
const btnMultiply = document.querySelector("#multiply");
const btnDivide = document.querySelector("#divide");
const btnEquals = document.querySelector("#equals");

const btnBackspace = document.querySelector("#backspace");
const btnClear = document.querySelector("#clear");

const keypadBtns = document.querySelectorAll(".keypad");
const operatorBtns = document.querySelectorAll(".operator");

const display = document.querySelector("#display");
display.textContent = "";

for (let button of keypadBtns) {
  button.value = button.textContent;
}
let a = null;
let b = null;
let operator = null;
let isRunning = false;

btnAdd.operator = (a, b) => a + b;
btnSubtract.operator = (a, b) => a - b;
btnMultiply.operator = (a, b) => a * b;
btnDivide.operator = (a, b) =>
  b === 0 ? "Division by zero is forbidden!" : a / b;

// populate the display with numbers as they're pressed and store in display value
for (let button of keypadBtns) {
  button.addEventListener("click", function updateDisplayValue() {
    if (a && !isRunning) {
      a = 0;
      display.textContent = "";
      isRunning = true;
    }
    display.textContent += this.value;
  });
}

btnSign.addEventListener("click", function changeSign() {
  if (!display.textContent.includes("-")) {
    display.textContent = "-" + display.textContent;
  } else {
    display.textContent = display.textContent.slice(1);
  }
});

// what happens when an operator is pressed instead of equals?
// - operate
// - returned value gets stored as "a"
// - "b" is reset

for (let button of operatorBtns) {
  button.addEventListener("click", function processData() {
    operator = this.operator;
    if (!a) a = Number(display.textContent) || 0;
    if (!isRunning) {
      display.textContent = "";
    } else {
      display.textContent = operate();
    }
    isRunning = true;
    if (!display.textContent.includes("."))
      btnDecimal.removeAttribute("disabled");
  });
}

function operate() {
  display.textContent ? (b = Number(display.textContent)) : (b = 0);
  display.textContent = operator(a, b);
  a = Number(display.textContent);
  b = null;
}

btnEquals.addEventListener("click", function handleEquals() {
  if (operator) {
    operate();
    a = Number(display.textContent);
    b = null;
    operator = null;
    isRunning = false;
  }
});

// only one decimal allowed
btnDecimal.addEventListener("click", function addDecimal() {
  btnDecimal.setAttribute("disabled", "");
});
// undo button
btnBackspace.addEventListener("click", function deleteNumber() {
  if (display.textContent) {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
  }
});
// clear button should wipe out any existing data
btnClear.addEventListener("click", function clearAll() {
  a = null;
  b = null;
  operator = null;
  display.textContent = "";
  isRunning = false;
  btnDecimal.removeAttribute("disabled");
});

// evaluate only one pair of digits at a time

// round answers with long decimals

// throw an error if user tries to divide by 0
// - animate?

// differentiate operator and keypad buttons

// keyboard support
