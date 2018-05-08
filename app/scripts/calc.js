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
    function isNumeric(item) {
        return !isNaN(parseFloat(item)) && isFinite(item);
    }

    numberButton.click(function() {
        var operating = $(this).attr("value");
        
        if (!isNumeric(input[input.length - 1])) {
            display.val("");
        }
        display.val(display.val() + operating);
        input.push(String(operating));
    });

    operationButton.click(function() {
        var operator = $(this).attr("id");
        var result;

        switch(operator) {
            case "clearButton":
                display.val("");
                input = [];
                debugFunction();
                break;
            case "equalsButton":
                result = eval(input.join(''));
                display.val(result);
                input = [];
                input.push(result);
                break;
            default:
                input.push(operations[operator]);
                break;
        }
    });
});