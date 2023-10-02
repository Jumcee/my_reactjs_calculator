import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [buffer, setBuffer] = useState('');
  const [operator, setOperator] = useState(null);
  const [isResult, setIsResult] = useState(false);
  const [expression, setExpression] = useState('');

  const handleNumberClick = (number) => {
    if (isResult) {
      setDisplayValue(number);
      setIsResult(false);
      setExpression(number);
    } else {
      setDisplayValue((prevDisplayValue) =>
        prevDisplayValue === '0' ? number : prevDisplayValue + number
      );
      setExpression((prevExpression) => prevExpression + number);
    }
  };

  const handleOperatorClick = (op) => {
    if (buffer) {
      evaluate();
    }
    setBuffer(displayValue);
    setOperator(op);
    setDisplayValue('0');
    setExpression((prevExpression) => prevExpression + ' ' + op + ' ');
  };

  const evaluate = () => {
    if (!operator) {
      return;
    }
    const current = parseFloat(displayValue);
    const previous = parseFloat(buffer);

    let result;
    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
      default:
        break;
    }

    setDisplayValue(result.toString());
    setBuffer('');
    setOperator(null);
    setIsResult(true);
    setExpression((prevExpression) => prevExpression + ' = ' + result.toString());
  };

  const clear = () => {
    setDisplayValue('0');
    setBuffer('');
    setOperator(null);
    setIsResult(false);
    setExpression('');
  };

  return (
    <div className="calculator">
      <div className="container">
        <div className="display">
          <div className="previous-value">{isResult ? buffer : ''}</div>
          {expression || displayValue}
        </div>
        <div className="buttons">
        <div className="row">
            {[1, 2, 3, '+'].map((item) => (
              <button key={item} onClick={() => (typeof item === 'number' ? handleNumberClick(item.toString()) : handleOperatorClick(item))}>
                {item}
              </button>
            ))}
          </div>
          <div className="row">
            {[4, 5, 6, '-'].map((item) => (
              <button key={item} onClick={() => (typeof item === 'number' ? handleNumberClick(item.toString()) : handleOperatorClick(item))}>
                {item}
              </button>
            ))}
          </div>
          <div className="row">
            {[7, 8, 9, '*'].map((item) => (
              <button key={item} onClick={() => (typeof item === 'number' ? handleNumberClick(item.toString()) : handleOperatorClick(item))}>
                {item}
              </button>
            ))}
          </div>
          <div className="row">
            {['C', 0, '=', '/'].map((item) => (
              <button
                key={item}
                onClick={() =>
                  typeof item === 'number'
                    ? handleNumberClick(item.toString())
                    : item === 'C'
                    ? clear()
                    : item === '='
                    ? evaluate() // Call evaluate when '=' is clicked
                    : handleOperatorClick(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
