$(document).ready(function(){var numberButton=$("[value]"),operationButton=$("button:not([value])"),display=$("#display"),input=[],afterEqualOp=!0,previousOperation=0,result,operations={addButton:"+",subtractButton:"-",divideButton:"/",multiplyButton:"*"};function evalInput(){try{result=eval(input.join(""))}catch(t){t instanceof SyntaxError&&input.pop()}2<input.length?previousOperation=input.slice(1).join(""):2<=previousOperation.length&&!afterEqualOp&&(result=eval(result+previousOperation)),clear(),input.push(result),display.val(result)}function isNumeric(t){return!isNaN(parseFloat(t))&&isFinite(t)}function clear(){afterEqualOp=!0,input=[]}numberButton.click(function(){var t=$(this).attr("value");isNumeric(input[input.length-1])||display.val(""),afterEqualOp||(display.val(""),clear()),display.val(display.val()+t),input.push(t)}),operationButton.click(function(){var t=$(this).attr("id");switch(t){case"clearButton":display.val(""),clear();break;case"equalsButton":evalInput(),afterEqualOp=!1;break;default:afterEqualOp=!0,evalInput(),input.push(operations[t])}})});