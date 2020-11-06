// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin js.
 *
 * @package     block_simple_calculator
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery'], function($) {
    var calculator = {
        init: function() {
            var currentOperand = '';
            var previousOperand = '';
            var operation = null;
            // CALCULATION
            $.calc = function() {
                let computation;
                const prev = parseFloat(previousOperand);
                const current = parseFloat(currentOperand);
                if (isNaN(prev) || isNaN(current)) {
                    return;
                }
                switch (operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '*':
                        computation = prev * current;
                        break;
                    case '÷':
                        computation = prev / current;
                        break;
                    default:
                        return;
                }
                currentOperand = computation;
                operation = null;
                previousOperand = '';
            };
            // NUMBER CLICKS
            $(document).on('click', '.data-calculator-number', function() {
                var number = $(this).text();
                if (number === '.' && currentOperand.includes('.')) {
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                } else {
                    currentOperand = currentOperand.toString() + number.toString();
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                }
            });
            // CLEAR DISPLAY
            $(document).on('click', '.data-calculator-all-clear', function() {
                currentOperand = '';
                previousOperand = '';
                operation = null;
                calculator.updateDisplay(currentOperand, operation, previousOperand);
            });
            // DELETE NUMBER
            $(document).on('click', '.data-calculator-delete', function() {
                currentOperand = currentOperand.toString().slice(0, -1);
                calculator.updateDisplay(currentOperand, operation, previousOperand);
            });
            // CALCULATOR OPS BUTTON
            $(document).on('click', '.data-calculator-operation', function() {
                operation = $(this).text();
                if (currentOperand !== '') {
                    if (previousOperand !== '') {
                        $.calc();
                    }
                    previousOperand = currentOperand;
                    currentOperand = '';
                    calculator.updateDisplay(previousOperand, operation, currentOperand);
                }
            });
            // EQ BUTTON CLICK
            $(document).on('click', '.data-calculator-equals', function() {
                if (currentOperand !== '') {
                    if (previousOperand !== '') {
                        $.calc();
                    }
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                }
            });

        },
        updateDisplay: function(currentOperand, operation, previousOperand) {
            $.getString = function(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
                }
                if (decimalDigits) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            };
            var value = $.getString(currentOperand);
            var previousValue = $.getString(previousOperand) + operation;
            $("#data-block-calculator-current-operand").text(value);
            if (operation) {
                $("#data-block-calculator-previous-operand").text(previousValue);
            } else {
                $("#data-block-calculator-previous-operand").text('');
            }
        }
    };
    return calculator;
});
