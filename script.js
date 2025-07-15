const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let expression = "";

function evaluateExpression(expr) {
  try {
    // Replace % with /100 for percentage handling
    const safeExpr = expr.replace(/%/g, "/100");
    const result = eval(safeExpr);
    if (isNaN(result) || !isFinite(result)) throw new Error();
    return result;
  } catch {
    return "Error";
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent;

    if (value === 'C') {
      expression = "";
      display.value = "";
    } else if (value === '⌫') {
      expression = expression.slice(0, -1);
      display.value = expression;
    } else if (value === '=') {
      const result = evaluateExpression(expression);
      display.value = result;
      expression = result === "Error" ? "" : result.toString();
    } else {
      expression += value;
      display.value = expression;
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ((/[0-9+\-*/.%]/).test(key)) {
    expression += key;
    display.value = expression;
  } else if (key === 'Enter') {
    const result = evaluateExpression(expression);
    display.value = result;
    expression = result === "Error" ? "" : result.toString();
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (key.toLowerCase() === 'c') {
    expression = "";
    display.value = "";
  }
});
