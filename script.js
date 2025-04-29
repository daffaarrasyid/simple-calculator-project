const display = document.getElementById('display');
    const expressionDisplay = document.getElementById('expression-display');
    let currentInput = '0';
    let expression = '';
    let resetNext = false;

    function updateDisplay() {
      display.textContent = currentInput;
    }

    function updateExpressionDisplay() {
      expressionDisplay.textContent = expression;
    }

    function inputNumber(num) {
      if (resetNext) {
        currentInput = num;
        resetNext = false;
      } else {
        if (currentInput === '0') {
          currentInput = num;
        } else {
          currentInput += num;
        }
      }
      updateDisplay();
    }

    function inputDot() {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
      }
    }

    function clearEntry() {
      currentInput = '0';
      updateDisplay();
    }

    function clearAll() {
      currentInput = '0';
      expression = '';
      updateDisplay();
      updateExpressionDisplay();
    }

    function backspace() {
      currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
      updateDisplay();
    }

    function inputOperator(op) {
      expression += currentInput + ' ' + op + ' ';
      currentInput = '0';
      resetNext = false;
      updateDisplay();
      updateExpressionDisplay();
    }

    function calculate() {
      expression += currentInput;
      try {
        currentInput = eval(expression.replace(/÷/g, '/').replace(/×/g, '*')).toString();
      } catch {
        currentInput = 'Error';
      }
      updateDisplay();
      updateExpressionDisplay();
      expression = '';
      resetNext = true;
    }

    function toggleSign() {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
    }

    function applyFunction(func) {
      expression = `${func}(${currentInput})`;
      updateExpressionDisplay();
      switch (func) {
        case '1/x':
          currentInput = parseFloat(currentInput) !== 0 ? (1 / parseFloat(currentInput)).toString() : 'Error';
          break;
        case 'square':
          currentInput = (parseFloat(currentInput) ** 2).toString();
          break;
        case 'sqrt':
          currentInput = parseFloat(currentInput) >= 0 ? Math.sqrt(parseFloat(currentInput)).toString() : 'Error';
          break;
      }
      updateDisplay();
      resetNext = true;
    }

    function percent() {
      expression = `${currentInput}%`;
      updateExpressionDisplay();
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay();
      resetNext = true;
    }

    document.querySelectorAll('.num').forEach(btn =>
      btn.addEventListener('click', () => inputNumber(btn.textContent))
    );
    document.getElementById('btn-clear-entry').onclick = clearEntry;
    document.getElementById('btn-clear').onclick = clearAll;
    document.getElementById('btn-backspace').onclick = backspace;
    document.getElementById('btn-equal').onclick = calculate;
    document.getElementById('btn-sign').onclick = toggleSign;
    document.getElementById('btn-percent').onclick = percent;
    document.querySelectorAll('[data-op]').forEach(btn =>
      btn.addEventListener('click', () => inputOperator(btn.getAttribute('data-op')))
    );
    document.querySelectorAll('[data-func]').forEach(btn =>
      btn.addEventListener('click', () => applyFunction(btn.getAttribute('data-func')))
    );
    document.getElementById('btn-dot').onclick = inputDot;