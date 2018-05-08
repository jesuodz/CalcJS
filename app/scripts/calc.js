$(document).ready( function() {
    var numberButton = $('[value]');
    var operationButton = $('button:not([value])');
    var display = $('#display');
    var input = [];
    var flag = true;

    var operations = {
        'addButton' : '+',
        'subtractButton' : '-',
        'divideButton' : '/',
        'multiplyButton' : '*'
    };

    function debugFunction() {
        console.log(input);
        console.log(flag);
    }
    function evalInput() {
        var result = eval(input.join(''));
        clear();
        input.push(result);
        display.val(result);
    }
    function isNumeric(item) {
        return !isNaN(parseFloat(item)) && isFinite(item);
    }
    function clear() {
        flag = true;
        input = [];
    }

    numberButton.click(function() {
        var operating = $(this).attr("value");

        if (!isNumeric(input[input.length - 1])) {
            display.val("");
        }
        if (!flag) {
            display.val("");
            clear();
        }

        display.val(display.val() + operating);
        input.push(String(operating));
        debugFunction();
    });

    operationButton.click(function() {
        var operator = $(this).attr("id");
        var result;

        switch(operator) {
            case "clearButton":
                display.val("");
                clear();
                debugFunction();
                break;
            case "equalsButton":
                result = eval(input.join(''));
                display.val(result);
                clear();
                input.push(result);

                flag = false;

                debugFunction();
                break;
            default:
                evalInput();
                input.push(operations[operator]);
                debugFunction();
                break;
        }
    });
});