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

for (let i = 0; i <= 9; i++) {
  numberBtns[i].value = i;
}
btnDecimal.value = ".";

const display = document.querySelector("#display");
display.textContent = "";

// populate the display with numbers as they're pressed and store in display value
for (let button of keypadBtns) {
  button.addEventListener("click", displayValue);
}
function displayValue() {
  display.textContent = display.textContent + this.value;
}
// only one decimal allowed
btnDecimal.addEventListener("click", addDecimal);
function addDecimal() {
  btnDecimal.setAttribute("disabled", "");
}

// add
function add(a, b) {
  return a + b;
}
// subtract
function subtract(a, b) {
  return a - b;
}
// multiply
function multiply(a, b) {
  return a * b;
}
// divide
function divide(a, b) {
  return a / b;
}

// operate: takes an operator and 2 numbers and calls an above function (=)
function operate(operator, a, b) {
  return operator(a, b);
}

// evaluate only one pair of digits at a time

// store returned value as first number for next operation

// round answers with long decimals

// what happens if = is pressed before entering all numbers or an operator?

// clear button should wipe out any existing data

// throw an error if user tries to divide by 0

// differentiate operator and keypad buttons
// undo button
btnBackspace.addEventListener("click", deleteNumber);
function deleteNumber() {
  if (displayValue) {
    displayValue = displayValue.slice(0, displayValue.length - 1);
  }
}
