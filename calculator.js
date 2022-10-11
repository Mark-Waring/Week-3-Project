mainDisplay = document.getElementById("display-screen");
// why does setting mainDisplay.innerText as a variable break everything?
const buttons = document.getElementsByClassName("buttons");
const numberButtons = document.getElementsByClassName("numbers");
const operatorButtons = document.getElementsByClassName("calculate");
const calculationDisplay = document.getElementById("calc-display");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const clearEntryButton = document.getElementById("clear-entry");
const decimalButton = document.getElementById("decimal");
const negativeButton = document.getElementById("negative");

let waitingInput = false;
let postPlusEquals = false;
let postMinusEquals = false;
let postMultiplyEquals = false;
let postDivideEquals = false;
let restrictOperator = 0;
let restrictNumber = 0;
let restrictDecimal = 0;

mainDisplay.style.fontFamily = "Arial, Helvetica, sans-serif";
mainDisplay.style.fontSize = "60px";
mainDisplay.style.color = "white";
/// is it possible with our current tools to reduce text font size based on string length?

calculationDisplay.style.fontFamily = "Arial, Helvetica, sans-serif";
calculationDisplay.style.fontSize = "20px";
calculationDisplay.style.color = "white";

negativeButton.addEventListener("mousedown", function () {
  negativeButton.style.backgroundColor = "white";
});

negativeButton.addEventListener("mouseup", function () {
  negativeButton.style.backgroundColor = "lightgrey";
  let mainDisplayNumber = parseFloat(mainDisplay.innerText, 10);
  mainDisplay.innerText = mainDisplayNumber * -1;
});

for (let i = 0; i < numberButtons.length; i++)
  numberButtons[i].addEventListener("mousedown", function () {
    this.style.backgroundColor = "lightgrey";
  });

for (let i = 0; i < operatorButtons.length; i++)
  operatorButtons[i].addEventListener("mousedown", function () {
    this.style.backgroundColor = "yellow";
  });

numberButtonPressed();
function numberButtonPressed() {
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("mouseup", function () {
      this.style.backgroundColor = "dimgrey";
      if (restrictNumber > 8) return;
      restrictOperator = 0;
      restrictNumber++;

      if (
        mainDisplay.innerText === "0" &&
        calculationDisplay.innerText === ""
      )
        mainDisplay.innerText = this.innerText;
      else if (
        mainDisplay.innerText !== "0" &&
        calculationDisplay.innerText === ""
      )
        mainDisplay.innerText += this.innerText;
      else if (mainDisplay.innerText === "0") {
        mainDisplay.innerText = this.innerText;
      } else if (
        ["+", "-", "*", "/"].includes(
          calculationDisplay.innerText.substr(-1, 1)
        )
      ) {
        if (waitingInput) {
          mainDisplay.innerText = this.innerText;
          waitingInput = false;
        } else {
          mainDisplay.innerText += this.innerText;
        }
      }
    });
  }
}

decimalButton.addEventListener("mousedown", function () {
  decimalButton.style.backgroundColor = "lightgrey";
});

decimalButtonPressed();
function decimalButtonPressed() {
  decimal.addEventListener("mouseup", function () {
    this.style.backgroundColor = "dimgrey";
    restrictOperator = 0;
    restrictDecimal++;
    if (restrictDecimal > 1) return;
    if (
      mainDisplay.innerText === "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText = this.innerText;
    else if (
      mainDisplay.innerText !== "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText += this.innerText;
    else if (mainDisplay.innerText === "0") {
      mainDisplay.innerText = this.innerText;
    } else if (
      ["+", "-", "*", "/"].includes(
        calculationDisplay.innerText.substr(-1, 1)
      )
    ) {
      if (waitingInput) {
        mainDisplay.innerText = this.innerText;
        waitingInput = false;
      } else {
        mainDisplay.innerText += this.innerText;
      }
    }
  });
}

// couldn't figure out how to make op buttons' background change until a different button is pressed
for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("mouseup", function () {
    waitingInput = true;
    numberClicked = false;
    restrictDecimal = 0;
    restrictNumber = 0;
    restrictOperator++;
    this.style.backgroundColor = "orange";
    if (
      (calculationDisplay.innerText === "" &&
        mainDisplay.innerText !== "0") ||
      restrictOperator > 1
    )
      calculationDisplay.innerText =
        mainDisplay.innerText + " " + this.innerText;
    else if (calculationDisplay.innerText.substr(-1, 1) === "+") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newSum = calcScreenNumber + displayScreenNumber;
      (mainDisplay.innerText = newSum),
        (calculationDisplay.innerText = newSum + " " + this.innerText);
    } else if (calculationDisplay.innerText.substr(-1, 1) === "-") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newDifference = calcScreenNumber - displayScreenNumber;
      mainDisplay.innerText = newDifference;
      calculationDisplay.innerText = newDifference + " " + this.innerText;
    } else if (calculationDisplay.innerText.substr(-1, 1) === "*") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newProduct = calcScreenNumber * displayScreenNumber;
      mainDisplay.innerText = newProduct;
      calculationDisplay.innerText = newProduct + " " + this.innerText;
    } else if (calculationDisplay.innerText.substr(-1, 1) === "/") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newQuotient = calcScreenNumber / displayScreenNumber;
      mainDisplay.innerText = newQuotient;
      calculationDisplay.innerText = newQuotient + " " + this.innerText;
    }

    calculationDisplay.innerText =
      mainDisplay.innerText + " " + this.innerText;
  });
}
equalsButton.addEventListener("mousedown", function () {
  equalsButton.style.backgroundColor = "yellow";
});
equalsButton.addEventListener("mouseup", function (equalsClick) {
  this.style.backgroundColor = "orange";
  restrictNumber = 0;
  let value1 = parseFloat(calculationDisplay.innerText, 10);
  let displayScreenNumber = parseFloat(mainDisplay.innerText);
  let newDisplayString = " " + displayScreenNumber;
  let calcDisplayText = calculationDisplay.innerText;
  let newCalcLastChar = calcDisplayText.slice(
    calcDisplayText.indexOf("+") + 1,
    calcDisplayText.lastIndexOf("=")
  );
  let value6 = calcDisplayText.slice(
    calcDisplayText.indexOf("-") + 1,
    calcDisplayText.lastIndexOf("=")
  );
  let value7 = calcDisplayText.slice(
    calcDisplayText.indexOf("*") + 1,
    calcDisplayText.lastIndexOf("=")
  );
  let value8 = calcDisplayText.slice(
    calcDisplayText.indexOf("/") + 1,
    calcDisplayText.lastIndexOf("=")
  );
  let opInCalcDisplay = calcDisplayText.slice(
    calcDisplayText.indexOf(" ") + 1,
    calcDisplayText.lastIndexOf(" ")
  );
  let displayOperator = opInCalcDisplay.charAt(0);

  value5 = parseFloat(newCalcLastChar);
  value9 = parseFloat(value6);
  value10 = parseFloat(value7);
  value11 = parseFloat(value8);
  if (postPlusEquals === true && displayOperator === "+")
    mainDisplay.innerText = displayScreenNumber + value5;
  else if (postPlusEquals === true && displayOperator === "-")
    mainDisplay.innerText = displayScreenNumber - value9;
  else if (postPlusEquals === true && displayOperator === "*")
    mainDisplay.innerText = displayScreenNumber * value10;
  else if (postPlusEquals === true && displayOperator === "/")
    mainDisplay.innerText = displayScreenNumber / value11;
  else if (calculationDisplay.innerText.substr(-1, 1) === "+")
    (mainDisplay.innerText = value1 + displayScreenNumber),
      (postPlusEquals = true);
  else if (postMinusEquals === true && displayOperator === "+")
    mainDisplay.innerText = displayScreenNumber + value5;
  else if (postMinusEquals === true && displayOperator === "-")
    mainDisplay.innerText = displayScreenNumber - value9;
  else if (postMinusEquals === true && displayOperator === "*")
    mainDisplay.innerText = displayScreenNumber * value10;
  else if (postMinusEquals === true && displayOperator === "/")
    mainDisplay.innerText = displayScreenNumber / value11;
  else if (calculationDisplay.innerText.substr(-1, 1) === "-")
    (mainDisplay.innerText = value1 - displayScreenNumber),
      (postMinusEquals = true);
  else if (postMultiplyEquals === true && displayOperator === "+")
    mainDisplay.innerText = displayScreenNumber + value5;
  else if (postMultiplyEquals === true && displayOperator === "-")
    mainDisplay.innerText = displayScreenNumber - value9;
  else if (postMultiplyEquals === true && displayOperator === "*")
    mainDisplay.innerText = displayScreenNumber * value10;
  else if (postMultiplyEquals === true && displayOperator === "/")
    mainDisplay.innerText = displayScreenNumber / value11;
  else if (calculationDisplay.innerText.substr(-1, 1) === "*")
    (mainDisplay.innerText = value1 * displayScreenNumber),
      (postMultiplyEquals = true);
  else if (postDivideEquals === true && displayOperator === "-")
    mainDisplay.innerText = displayScreenNumber - value9;
  else if (postDivideEquals === true && displayOperator === "*")
    mainDisplay.innerText = displayScreenNumber * value10;
  else if (postDivideEquals === true && displayOperator === "/")
    mainDisplay.innerText = displayScreenNumber / value11;
  else if (calculationDisplay.innerText.substr(-1, 1) === "/")
    (mainDisplay.innerText = value1 / displayScreenNumber),
      (postDivideEquals = true);

  calculationDisplay.innerText += newDisplayString + " =";
});

clearButton.addEventListener("mousedown", function (e) {
  clearButton.style.backgroundColor = "white";
});
clearButton.addEventListener("mouseup", function (e) {
  clearButton.style.backgroundColor = "lightgrey";
  mainDisplay.innerText = "0";
  calculationDisplay.innerText = "";
  restrictNumber = 0;
});

clearEntryButton.addEventListener("mousedown", function (e) {
  clearEntryButton.style.backgroundColor = "white";
});

clearEntryButton.addEventListener("mouseup", function (e) {
  clearEntryButton.style.backgroundColor = "lightgrey";
  if (calculationDisplay.innerText.includes("="))
    (mainDisplay.innerText = "0"), (calculationDisplay.innerText = "");
  else mainDisplay.innerText = "0";
  restrictNumber = 0;
});

document.body.addEventListener("keydown", (e) => {
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0"
  ) {
    if (restrictNumber > 8) return;
    restrictOperator = 0;
    restrictNumber++;

    if (
      mainDisplay.innerText === "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText = e.key;
    else if (
      mainDisplay.innerText !== "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText += e.key;
    else if (mainDisplay.innerText === "0") {
      mainDisplay.innerText = e.key;
    } else if (
      ["+", "-", "*", "/"].includes(
        calculationDisplay.innerText.substr(-1, 1)
      )
    ) {
      if (waitingInput) {
        mainDisplay.innerText = e.key;
        waitingInput = false;
      } else {
        mainDisplay.innerText += e.key;
      }
    }
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    waitingInput = true;
    numberClicked = false;
    restrictDecimal = 0;
    restrictNumber = 0;
    restrictOperator++;
    if (
      (calculationDisplay.innerText === "" &&
        mainDisplay.innerText !== "0") ||
      restrictOperator > 1
    )
      calculationDisplay.innerText = mainDisplay.innerText + " " + e.key;
    else if (calculationDisplay.innerText.substr(-1, 1) === "+") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newSum = calcScreenNumber + displayScreenNumber;
      let newSumNumber = parseFloat(newSum);
      (mainDisplay.innerText = newSumNumber),
        (calculationDisplay.innerText = newSum + " " + e.key);
    } else if (calculationDisplay.innerText.substr(-1, 1) === "-") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newDifference = calcScreenNumber - displayScreenNumber;
      mainDisplay.innerText = newDifference;
      calculationDisplay.innerText = newDifference + " " + e.key;
    } else if (calculationDisplay.innerText.substr(-1, 1) === "*") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newProduct = calcScreenNumber * displayScreenNumber;
      mainDisplay.innerText = newProduct;
      calculationDisplay.innerText = newProduct + " " + e.key;
    } else if (calculationDisplay.innerText.substr(-1, 1) === "/") {
      let calcScreenNumber = parseFloat(calculationDisplay.innerText, 10);
      let displayScreenNumber = parseFloat(mainDisplay.innerText, 10);
      let newQuotient = calcScreenNumber / displayScreenNumber;
      mainDisplay.innerText = newQuotient;
      calculationDisplay.innerText = newQuotient + " " + e.key;
    }

    calculationDisplay.innerText = mainDisplay.innerText + " " + e.key;
  } else if ((e.key = "Enter")) {
    restrictNumber = 0;
    let value1 = parseFloat(calculationDisplay.innerText, 10);
    let displayScreenNumber = parseFloat(mainDisplay.innerText);
    let newDisplayString = " " + displayScreenNumber;
    let calcDisplayText = calculationDisplay.innerText;
    let newCalcLastChar = calcDisplayText.slice(
      calcDisplayText.indexOf("+") + 1,
      calcDisplayText.lastIndexOf("=")
    );
    let value6 = calcDisplayText.slice(
      calcDisplayText.indexOf("-") + 1,
      calcDisplayText.lastIndexOf("=")
    );
    let value7 = calcDisplayText.slice(
      calcDisplayText.indexOf("*") + 1,
      calcDisplayText.lastIndexOf("=")
    );
    let value8 = calcDisplayText.slice(
      calcDisplayText.indexOf("/") + 1,
      calcDisplayText.lastIndexOf("=")
    );
    let opInCalcDisplay = calcDisplayText.slice(
      calcDisplayText.indexOf(" ") + 1,
      calcDisplayText.lastIndexOf(" ")
    );
    let displayOperator = opInCalcDisplay.charAt(0);

    value5 = parseFloat(newCalcLastChar);
    value9 = parseFloat(value6);
    value10 = parseFloat(value7);
    value11 = parseFloat(value8);
    if (postPlusEquals === true && displayOperator === "+")
      mainDisplay.innerText = displayScreenNumber + newCalcDisplayNumber;
    else if (postPlusEquals === true && displayOperator === "-")
      mainDisplay.innerText = displayScreenNumber - value9;
    else if (postPlusEquals === true && displayOperator === "*")
      mainDisplay.innerText = displayScreenNumber * value10;
    else if (postPlusEquals === true && displayOperator === "/")
      mainDisplay.innerText = displayScreenNumber / value11;
    else if (calculationDisplay.innerText.substr(-1, 1) === "+")
      (mainDisplay.innerText = value1 + displayScreenNumber),
        (postPlusEquals = true);
    else if (postMinusEquals === true && displayOperator === "+")
      mainDisplay.innerText = displayScreenNumber + newCalcDisplayNumber;
    else if (postMinusEquals === true && displayOperator === "-")
      mainDisplay.innerText = displayScreenNumber - value9;
    else if (postMinusEquals === true && displayOperator === "*")
      mainDisplay.innerText = displayScreenNumber * value10;
    else if (postMinusEquals === true && displayOperator === "/")
      mainDisplay.innerText = displayScreenNumber / value11;
    else if (calculationDisplay.innerText.substr(-1, 1) === "-")
      (mainDisplay.innerText = value1 - displayScreenNumber),
        (postMinusEquals = true);
    else if (postMultiplyEquals === true && displayOperator === "+")
      mainDisplay.innerText = displayScreenNumber + newCalcDisplayNumber;
    else if (postMultiplyEquals === true && displayOperator === "-")
      mainDisplay.innerText = displayScreenNumber - value9;
    else if (postMultiplyEquals === true && displayOperator === "*")
      mainDisplay.innerText = displayScreenNumber * value10;
    else if (postMultiplyEquals === true && displayOperator === "/")
      mainDisplay.innerText = displayScreenNumber / value11;
    else if (calculationDisplay.innerText.substr(-1, 1) === "*")
      (mainDisplay.innerText = value1 * displayScreenNumber),
        (postMultiplyEquals = true);
    else if (postDivideEquals === true && displayOperator === "-")
      mainDisplay.innerText = displayScreenNumber - value9;
    else if (postDivideEquals === true && displayOperator === "*")
      mainDisplay.innerText = displayScreenNumber * value10;
    else if (postDivideEquals === true && displayOperator === "/")
      mainDisplay.innerText = displayScreenNumber / value11;
    else if (calculationDisplay.innerText.substr(-1, 1) === "/")
      (mainDisplay.innerText = value1 / displayScreenNumber),
        (postDivideEquals = true);

    calculationDisplay.innerText += newDisplayString + " =";
  } else if ((e.key = ".")) {
    restrictOperator = 0;
    restrictDecimal++;
    if (restrictDecimal > 1) return;
    if (
      mainDisplay.innerText === "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText = e.key;
    else if (
      mainDisplay.innerText !== "0" &&
      calculationDisplay.innerText === ""
    )
      mainDisplay.innerText += e.key;
    else if (mainDisplay.innerText === "0") {
      mainDisplay.innerText = e.key;
    } else if (
      ["+", "-", "*", "/"].includes(
        calculationDisplay.innerText.substr(-1, 1)
      )
    ) {
      if (waitingInput) {
        mainDisplay.innerText = e.key;
        waitingInput = false;
      } else {
        mainDisplay.innerText += e.key;
      }
    }
  }
});
