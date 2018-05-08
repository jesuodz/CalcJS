$(document).ready( function() {
    var numberButton = $('[value]');
    var operationButton = $('button:not([value])');
    var display = $('#display');
    var input = [];

    var operations = {
        'addButton' : '+',
        'subtractButton' : '-',
        'divideButton' : '/',
        'multiplyButton' : '*'
    }

    numberButton.click(function() {
        var operating = $(this).attr("value");
        
        display.val(display.val() + operating);
        input.push(String(operating));
    });

    operationButton.click(function() {
        var operator = $(this).attr("id");

        switch(operator) {
            case "clearButton":
                display.val("");
                input = [];
                break;
            case "equalsButton":
                console.log(input);
                var joinedInput = input.join('');
                display.val(eval(joinedInput));
                break;
            default:
                input.push(operations[operator]);
                break;
        }
    });
});