const btn0 = document.querySelector("#zero");
const btn1 = document.querySelector("#one");
const btn2 = document.querySelector("#two");
const btn3 = document.querySelector("#three");
const btn4 = document.querySelector("#four");
const btn5 = document.querySelector("#five");
const btn6 = document.querySelector("#six");
const btn7 = document.querySelector("#seven");
const btn8 = document.querySelector("#eight");
const btn9 = document.querySelector("#nine");
const btnDecimal = document.querySelector("#decimal");

const btnAdd = document.querySelector("#add");
const btnSubtract = document.querySelector("#subtract");
const btnMultiply = document.querySelector("#multiply");
const btnDivide = document.querySelector("#divide");
const btnEquals = document.querySelector("#equals");

const btnBackspace = document.querySelector("#backspace");
const btnClear = document.querySelector("#clear");

const numberBtns = document.querySelectorAll(".number");
const keypadBtns = document.querySelectorAll(".keypad");
const operatorBtns = document.querySelectorAll(".operator");

let display = document.querySelector("#display");
display.textContent = "";

// populate the display with numbers as they're pressed and store in display value
for (let i = 0; i <= 9; i++) {
  numberBtns[i].value = i;
}
btnDecimal.value = ".";
for (let button of keypadBtns) {
  button.addEventListener("click", updateDisplayValue);
}
function updateDisplayValue() {
  display.textContent = display.textContent + this.value;
  display.value = Number(display.textContent);
}

let a = 0;
let b = 0;
let operator = null;

btnAdd.operator = function add(a, b) {
  return a + b;
};
btnSubtract.operator = function subtract(a, b) {
  return a - b;
};
btnMultiply.operator = function multiply(a, b) {
  return a * b;
};
btnDivide.operator = function divide(a, b) {
  return a / b;
};

btnEquals.addEventListener("click", operate);

function operate() {
  storeB();
  display.textContent = operator.operator;
  display.value = Number(display.textContent);
  a = display.value;
}

btnAdd.addEventListener("click", storeA);
// if operator gets pressed, store currently displayed number as a
function storeA() {
  if (display.value) {
    a = display.value;
  } else {
    a = 0;
  }
  display.value = 0;
  display.textContent = "";
  operator = this.operator;
}

function storeB() {
  display.value ? (b = display.value) : (b = 0);
}

// only one decimal allowed
btnDecimal.addEventListener("click", addDecimal);
function addDecimal() {
  btnDecimal.setAttribute("disabled", "");
}
// undo button
btnBackspace.addEventListener("click", deleteNumber);
function deleteNumber() {
  if (display.textContent) {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
  }
}
// clear button should wipe out any existing data
btnClear.addEventListener("click", clearAll);
function clearAll() {
  a = "";
  b = "";
  display.textContent = "";
  btnDecimal.removeAttribute("disabled");
}

// evaluate only one pair of digits at a time

// store returned value as first number for next operation

// round answers with long decimals

// what happens if = is pressed before entering all numbers or an operator?

// throw an error if user tries to divide by 0
// - animate?

// differentiate operator and keypad buttons

// keyboard support
