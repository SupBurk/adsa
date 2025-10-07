(function () {
  const currentEl = document.getElementById('current-operand');
  const previousEl = document.getElementById('previous-operand');
  const keysEl = document.getElementById('keys');

  const DECIMAL_CHARS = new Set(['.', ',']);
  const MAX_LENGTH = 18;

  let current = '0';
  let previous = '';
  let operator = null; // '+', '-', '*', '/'
  let justEvaluated = false;

  function formatDisplay(value) {
    if (value === '') return '';
    const normalized = value.replace(',', '.');
    if (!Number.isFinite(Number(normalized))) return value;
    const [intPart, decPart] = normalized.split('.');
    const intFormatted = Number(intPart).toLocaleString('tr-TR');
    if (decPart == null || decPart === '') return intFormatted;
    return `${intFormatted}${','}${decPart}`;
  }

  function updateDisplay() {
    currentEl.textContent = formatDisplay(current);
    previousEl.textContent = previous;
  }

  function clearAll() {
    current = '0';
    previous = '';
    operator = null;
    justEvaluated = false;
    updateDisplay();
  }

  function clearEntry() {
    current = '0';
    justEvaluated = false;
    updateDisplay();
  }

  function appendDigit(d) {
    if (justEvaluated) {
      current = '0';
      justEvaluated = false;
    }
    if (current.length >= MAX_LENGTH) return;
    if (current === '0') {
      current = d;
    } else {
      current += d;
    }
    updateDisplay();
  }

  function appendDecimal() {
    if (justEvaluated) {
      current = '0';
      justEvaluated = false;
    }
    if (current.includes('.') || current.includes(',')) return;
    current += ',';
    updateDisplay();
  }

  function setOperator(op) {
    if (operator && !justEvaluated) {
      // chain: compute previous op first
      evaluate();
    }
    previous = `${formatDisplay(current)} ${symbolFor(op)}`;
    operator = op;
    current = '0';
    justEvaluated = false;
    updateDisplay();
  }

  function symbolFor(op) {
    switch (op) {
      case '/': return '÷';
      case '*': return '×';
      case '-': return '−';
      case '+': return '+';
      default: return op;
    }
  }

  function percent() {
    const n = Number(current.replace(',', '.'));
    if (!Number.isFinite(n)) return;
    const res = n / 100;
    current = String(res).replace('.', ',');
    updateDisplay();
  }

  function evaluate() {
    if (!operator) return;
    const a = Number((previous.split(' ')[0] || '0').replace(/\./g, '').replace(',', '.'));
    const b = Number(current.replace(',', '.'));
    let result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        if (b === 0) {
          current = 'Sıfıra bölünemez';
          previous = '';
          operator = null;
          justEvaluated = true;
          updateDisplay();
          return;
        }
        result = a / b; break;
      default: return;
    }
    current = String(result).replace('.', ',');
    previous = '';
    operator = null;
    justEvaluated = true;
    updateDisplay();
  }

  function backspace() {
    if (justEvaluated) return;
    if (current.length <= 1) {
      current = '0';
    } else {
      current = current.slice(0, -1);
    }
    updateDisplay();
  }

  // Mouse / touch input
  keysEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.dataset.digit) return appendDigit(btn.dataset.digit);
    if (btn.dataset.decimal != null) return appendDecimal();
    if (btn.dataset.operator) return setOperator(btn.dataset.operator);

    const action = btn.dataset.action;
    if (action === 'clear-all') return clearAll();
    if (action === 'clear-entry') return clearEntry();
    if (action === 'percent') return percent();
    if (action === 'equals') return evaluate();
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const { key } = e;
    if (key >= '0' && key <= '9') return appendDigit(key);
    if (DECIMAL_CHARS.has(key)) return appendDecimal();
    if (key === '+' || key === '-' || key === '*' || key === '/') return setOperator(key);
    if (key === 'Enter' || key === '=') return evaluate();
    if (key === 'Backspace') return backspace();
    if (key === 'Escape') return clearAll();
  });

  // init
  updateDisplay();
})();

