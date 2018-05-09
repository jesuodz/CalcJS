$(document).ready( function() {
    var numberButton = $('[value]');
    var operationButton = $('button:not([value])');
    var display = $('#display');
    var input = [];
    var afterEqualOp = true;
    var previousOperation = 0;
    var result;

    var operations = {
        'addButton' : '+',
        'subtractButton' : '-',
        'divideButton' : '/',
        'multiplyButton' : '*'
    };

    function evalInput() {
        try {
        result = eval(input.join(''));
        } catch(error) {
            if (error instanceof SyntaxError) {
                input.pop();
            }
        }
        
        if (input.length > 2) {
            previousOperation = input.slice(1).join('');
        } else if (previousOperation.length >= 2 && !afterEqualOp) {
            result = eval(result+previousOperation);
        }

        clear();
        input.push(result);
        display.val(result);
    }

    function isNumeric(item) {
        return !isNaN(parseFloat(item)) && isFinite(item);
    }

    function clear() {
        afterEqualOp = true;
        input = [];
    }

    numberButton.click(function() {
        var operating = $(this).attr("value");

        if (!isNumeric(input[input.length - 1])) {
            display.val("");
        }
        if (!afterEqualOp) {
            display.val("");
            clear();
        }

        display.val(display.val() + operating);
        input.push(operating);
    });

    operationButton.click(function() {
        var operator = $(this).attr("id");
        var result;

        switch(operator) {
            case "clearButton":
                display.val("");
                clear();
                break;
            case "equalsButton":
                evalInput();
                afterEqualOp = false;
                break;
            default:
                afterEqualOp = true;
                evalInput();
                input.push(operations[operator]);
                break;
        }
    });
});