$(document).ready( function() {
    var operation;

    function printOnDisplay( e ) {
        var displayValues = $('#display').value.split('');
        displayValues += e;
        displayValues.join('');
        $('#display').val(displayValues);
    }

    $('button').on('click', function() {
        var value = this.value;
        console.log(value);
        printOnDisplay(value);
    });
});