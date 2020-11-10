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
// You should have received a copy of the GNU General Public License along with
// Moodle.  If not, see <https://www.gnu.org/licenses/>.

define(['jquery'], function($) {
    var calculator = {
        init: function() {
            var currentOperand = '';
            var previousOperand = '';
            var operation = null;
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
                if (operation !== null && currentOperand !== '' && previousOperand !== '') {
                    $.calc('operation');
                    previousOperand = currentOperand;
                    currentOperand = '';
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                }
                operation = $(this).text();
                if (currentOperand !== '') {
                    if (previousOperand !== '') {
                        $.calc('operation');
                    }
                    previousOperand = currentOperand;
                    currentOperand = '';
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                } else if (currentOperand === '') {
                    if (previousOperand !== '') {
                        calculator.updateDisplay(currentOperand, operation, previousOperand);
                    }
                }
            });
            // EQ BUTTON CLICK
            $(document).on('click', '.data-calculator-equals', function() {
                if (currentOperand !== '') {
                    if (previousOperand !== '') {
                        $.calc('equal');
                    }
                    calculator.updateDisplay(currentOperand, operation, previousOperand);
                }
            });
            // CALCULATION
            $.calc = function(feature) {
                let finalValue;
                var invalid = false;
                const previous = parseFloat(previousOperand);
                const current = parseFloat(currentOperand);
                if (operation === '+') {
                    finalValue = previous + current;
                } else if (operation === '-') {
                    finalValue = previous - current;
                } else if (operation === '*') {
                    finalValue = previous * current;
                } else if (operation === '÷') {
                    finalValue = previous / current;
                } else {
                    invalid = true;
                }
                if (!invalid) {
                    currentOperand = finalValue;
                    if (feature === 'equal') {
                        operation = null;
                        previousOperand = '';
                    }
                }
            };
        },
        updateDisplay: function(currentOperand, operation, previousOperand) {
            var previousValue = '';
            $("#data-block-calculator-current-operand").text(currentOperand);
            if (operation) {
                previousValue = previousOperand + operation;
                $("#data-block-calculator-previous-operand").text(previousValue);
            } else {
                $("#data-block-calculator-previous-operand").text('');
            }
        }
    };
    return calculator;
});
